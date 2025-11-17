import { useEffect, useState } from "react";

interface HotelImagesProps {
  cover: string;
  images: string[];
}

export default function HotelImages({ cover, images }: HotelImagesProps) {
  const gallery = [cover, ...images].slice(0, 5);
  const allImages = [cover, ...images];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (i: number) => {
    setCurrentIndex(i);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* GALLERY GRID */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-3 rounded-xl overflow-hidden">
        {/* Main big image */}
        <div
          className="col-span-4 md:col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => openModal(0)}
        >
          <img
            src={gallery[0]}
            className="w-full h-[250px] md:h-[420px] object-cover rounded-xl"
          />
        </div>

        {/* Small images */}
        {gallery.slice(1).map((img, i) => (
          <div
            key={i}
            className="relative cursor-pointer"
            onClick={() => openModal(i + 1)}
          >
            <img
              src={img}
              className="w-full h-[120px] md:h-[205px] object-cover rounded-xl"
            />

            {/* "Show all photos" on last image */}
            {i === gallery.slice(1).length - 1 && (
              <button className="cursor-pointer absolute bottom-2 right-2 bg-white px-3 py-1 rounded-lg shadow text-sm md:text-base">
                Show all photos
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="relative w-full max-w-5xl p-4">
            <img
              src={allImages[currentIndex]}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Prev */}
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-4xl font-bold"
              onClick={prevImage}
            >
              ❮
            </button>

            {/* Next */}
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-4xl font-bold"
              onClick={nextImage}
            >
              ❯
            </button>
          </div>
        </div>
      )}
    </>
  );
}
