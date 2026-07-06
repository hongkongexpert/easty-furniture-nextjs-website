"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images.length) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
        <Image src={activeImage} alt={productName} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        {images.map((thumb, index) => {
          const isActive = thumb === activeImage;
          return (
            <button
              type="button"
              className={isActive ? "relative aspect-square overflow-hidden border-2 border-primary bg-surface-container" : "relative aspect-square overflow-hidden border border-transparent bg-surface-container hover:border-primary/50"}
              key={`${productName}-${index}-${thumb}`}
              onClick={() => setActiveImage(thumb)}
              aria-label={`Show ${productName} gallery image ${index + 1}`}
            >
              <Image src={thumb} alt={`${productName} gallery image ${index + 1}`} fill className={isActive ? "object-cover opacity-70" : "object-cover"} sizes="(max-width: 768px) 33vw, 12vw" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
