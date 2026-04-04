// export function sanitize<T extends Record<string, any>>(
//   data: T | null | undefined,
// ): T {
//   if (!data) return {} as T;

//   const cleanData: any = {};

//   for (const key in data) {
//     const value = data[key];

//     if (value === null || value === undefined) {
//       cleanData[key] = undefined;
//     } else if (typeof value === "string") {
//       cleanData[key] = value.trim();
//     } else {
//       cleanData[key] = value;
//     }
//   }

//   return cleanData;
// }
export function sanitize<T extends Record<string, any>>(
  data: T | null | undefined,
): Partial<T> {
  if (!data) return {};
  const cleanData: any = {};
  for (const key in data) {
    const value = data[key];
    if (value === null || value === undefined) {
      continue;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") {
        continue;
      }
      cleanData[key] = trimmed;
      continue;
    }

    cleanData[key] = value;
  }

  return cleanData;
}
