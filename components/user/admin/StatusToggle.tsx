"use client";

import { useToggleUserStatus } from "@/hooks/user/useToggleUserStatus";
import { UserStatus } from "@/types/admin";

// export default function StatusToggle({
//   userId,
//   status,
// }: {
//   userId: string;
//   status: UserStatus;
// }) {
//   const toggle = useToggleUserStatus();
//   const isActive = status === "active";

//   return (
//     <button
//       onClick={() =>
//         toggle.mutate({ userId, status: isActive ? "suspended" : "active" })
//       }
//       disabled={toggle.isPending}
//       className={`relative inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold transition-all
//         ${
//           isActive
//             ? "bg-success/20 text-success border border-success/30 hover:bg-success/30"
//             : "bg-error/20 text-error border border-error/30 hover:bg-error/30"
//         } disabled:opacity-50`}
//     >
//       <span
//         className={`w-1.5 h-1.5 rounded-full mr-2 ${isActive ? "bg-success" : "bg-error"} animate-pulse`}
//       />
//       {toggle.isPending ? "Syncing..." : isActive ? "Active" : "Suspended"}
//     </button>
//   );
// }
export default function StatusToggle({
  userId,
  status,
}: {
  userId: string;
  status: UserStatus;
}) {
  const toggle = useToggleUserStatus();
  const isActive = status === "active";

  return (
    <button
      onClick={() =>
        toggle.mutate({ userId, status: isActive ? "suspended" : "active" })
      }
      disabled={toggle.isPending}
      className={`
        relative inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-tight uppercase transition-all
        ${
          isActive
            ? "bg-green-100 text-green-700 border border-green-200" // Fallback colors if theme fails
            : "bg-red-100 text-red-700 border border-red-200"
        }
        hover:scale-105 active:scale-95 disabled:opacity-50
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? "bg-green-600" : "bg-red-600"}`}
      />
      {toggle.isPending ? "..." : isActive ? "Active" : "Suspended"}
    </button>
  );
}
