"use client";

import * as React from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

interface MyComponentProps {
  children: React.ReactNode;
  className?: string; // Add this!
}

export const Form = FormProvider;

export const FormField = Controller;

export const FormItem = ({ children, className }: MyComponentProps) => {
  return <div className={className}>{children}</div>;
};

export const FormLabel = ({ children, className }: MyComponentProps) => {
  return <label className={className}>{children}</label>;
};

export const FormControl = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const FormMessage = ({ children }: { children?: React.ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};
