import Image from "next/image";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdPlayArrow } from "react-icons/md";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
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
        className="absolute left-8 z-120 text-white hover:text-gray-400"
      >
        <MdPlayArrow className="h-16 w-16 rotate-180" />
      </button>

      <div className="relative h-[85vh] w-[85vw]">
        <Image
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1} en pantalla completa`}
          fill
          style={{ objectFit: "contain" }}
          className="select-none"
        />
      </div>

      <button
        onClick={onNext}
        className="absolute right-8 z-[120] text-white hover:text-gray-400"
      >
        <MdPlayArrow className="h-16 w-16" />
      </button>
    </div>
  );
}
