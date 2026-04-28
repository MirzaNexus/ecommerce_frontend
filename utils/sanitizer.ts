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

type Primitive = string | number | boolean | null | undefined;

export function deepSanitize<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle strings
  if (typeof data === "string") {
    return data.trim() as T;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data
      .map((item) => deepSanitize(item))
      .filter(
        (item) =>
          item !== null &&
          item !== undefined &&
          !(typeof item === "string" && item.trim() === ""),
      ) as T;
  }

  // Handle objects
  if (typeof data === "object") {
    const cleaned: Record<string, unknown> = {};

    for (const key in data as Record<string, unknown>) {
      const value = (data as Record<string, unknown>)[key];

      if (value === null || value === undefined) continue;

      const sanitizedValue = deepSanitize(value);

      if (
        sanitizedValue === null ||
        sanitizedValue === undefined ||
        (typeof sanitizedValue === "string" && sanitizedValue.trim() === "")
      ) {
        continue;
      }

      cleaned[key] = sanitizedValue;
    }

    return cleaned as T;
  }

  return data;
}
