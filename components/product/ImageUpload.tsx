"use client";

import { useDropzone } from "react-dropzone";
import { Upload, X, ImageIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "../ui/button";

interface FileUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  error?: string;
}

export default function FileUpload({
  value,
  onChange,
  error,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
    setPreview(null);
  };

  return (
    <div className="space-y-2 w-full">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center gap-2
          ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}
          ${error ? "border-error bg-error/5" : ""}
        `}
      >
        <input {...getInputProps()} />

        {preview || value ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
            <img
              src={
                preview ||
                (value instanceof File ? URL.createObjectURL(value) : "")
              }
              className="w-full h-full object-contain bg-muted"
              alt="Preview"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-7 w-7 rounded-full p-0 shadow-lg"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="p-3 bg-muted rounded-full">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click or drag image here</p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or WebP (Max 5MB)
              </p>
            </div>
          </>
        )}
      </div>
      {error && <p className="text-xs text-error font-medium">{error}</p>}
    </div>
  );
}

// // Is line ko change karein:
// src={
//   preview ||
//   (value instanceof File ? URL.createObjectURL(value) : (typeof value === "string" ? value : ""))
// }
