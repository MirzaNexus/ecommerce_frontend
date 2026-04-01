import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const useAuthInit = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setInitializing = useAuthStore((s) => s.setInitializing); // Yeh state add karein

  useEffect(() => {
    const init = async () => {
      setInitializing(true); // Check shuru hua
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        setInitializing(false); // Check khatam (user not logged in)
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
        );
        setAuth(res.data);
      } catch {
        clearAuth();
      } finally {
        setInitializing(false); // Response mil gaya, ab status final hai
      }
    };

    init();
  }, []); // Dependencies empty rakhein taake sirf ek baar chale mount par
};

// export const useAuthInit = () => {
//   const setAuth = useAuthStore((s) => s.setAuth);
//   const clearAuth = useAuthStore((s) => s.clearAuth);

//   useEffect(() => {
//     const init = async () => {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) return;

//       try {
//         const res = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//           { refreshToken },
//         );

//         setAuth(res.data);
//       } catch {
//         clearAuth();
//       }
//     };

//     init();
//   }, [setAuth, clearAuth]);
// };
