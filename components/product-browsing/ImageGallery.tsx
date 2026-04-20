import { useState, useEffect } from "react";
// ImageGallery.tsx

export const ImageGallery = ({
  images,
  selectedImage,
  onImageClick,
}: {
  images: string[];
  selectedImage: string;
  onImageClick: (url: string) => void; // Prop define karein
}) => {
  const uniqueImages = Array.from(new Set(images)).filter(Boolean);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-auto pb-2 md:pb-0 scrollbar-hide">
        {uniqueImages.map((img, i) => (
          <button
            key={i}
            onClick={() => onImageClick(img)} // Yahan trigger hoga logic
            className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === img
                ? "border-primary scale-95 shadow-md"
                : "border-transparent opacity-60"
            }`}
          >
            <img
              src={img}
              className="object-cover w-full h-full"
              alt="Thumbnail"
            />
          </button>
        ))}
      </div>

      {/* Main View */}
      <div className="flex-1 aspect-[4/5] relative overflow-hidden rounded-[2rem] bg-muted/30 border border-border/50 shadow-2xl">
        <img
          src={selectedImage || "/placeholder.png"}
          className="object-cover w-full h-full transition-all duration-700"
          alt="Selected"
        />
      </div>
    </div>
  );
};
