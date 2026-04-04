export const getDeviceId = () => {
  // SSR Guard: Agar server pe hai toh foran empty string return karo
  if (typeof window === "undefined") return "";

  try {
    let id = localStorage.getItem("deviceId");
    if (!id) {
      id = crypto.randomUUID(); // Modern way to generate ID
      localStorage.setItem("deviceId", id);
    }
    return id;
  } catch (e) {
    // Agar user ne cookies/storage block ki hui hain toh crash na ho
    return "fallback_id";
  }
};
