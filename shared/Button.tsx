"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={!loading ? onClick : undefined}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition",
        variantStyles[variant],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
