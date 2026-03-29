"use client";

import { UserStatus } from "@/types/admin";

interface Props {
  value?: UserStatus;
  onChange: (val?: UserStatus) => void;
}

export default function FilterDropdown({ value, onChange }: Props) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value as UserStatus)}
      className="border px-3 py-2 rounded"
    >
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="suspended">Suspended</option>
    </select>
  );
}
