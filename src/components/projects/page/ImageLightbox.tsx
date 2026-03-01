import Image from "next/image";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdPlayArrow } from "react-icons/md";
import { ProjectPageDictionary } from "./ProjectPage";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
  dict: ProjectPageDictionary;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSelect,
  dict,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-120 mt-10 text-white hover:text-gray-400"
      >
        <IoCloseOutline className="h-12 w-12" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 z-120 text-white hover:text-gray-400 sm:left-8"
      >
        <MdPlayArrow className="h-12 w-12 rotate-180 sm:h-16 sm:w-16" />
      </button>

      <div className="relative flex h-[70vh] w-[90vw] flex-col items-center justify-center sm:h-[80vh] sm:w-[85vw]">
        <Image
          src={images[currentIndex]}
          alt={`${dict.image} ${currentIndex + 1} ${dict.fullscreen}`}
          fill
          style={{ objectFit: "contain" }}
          className="select-none"
        />
      </div>

      <button
        onClick={onNext}
        className="absolute right-4 z-120 text-white hover:text-gray-400 sm:right-8"
      >
        <MdPlayArrow className="h-12 w-12 sm:h-16 sm:w-16" />
      </button>

      <div className="no-scrollbar absolute right-0 bottom-4 left-0 z-120 flex justify-center gap-2 overflow-x-auto px-4 py-2 sm:bottom-8 sm:gap-4">
        {images.map((imgSrc, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all sm:h-16 sm:w-24 ${
              currentIndex === index
                ? "scale-110 border-white opacity-100"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={imgSrc}
              alt={`${dict.image} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
