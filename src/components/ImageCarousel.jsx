import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/img-1.jpeg",
  "/images/img-2.jpeg",
  "/images/img-3.jpeg",
  "/images/img-4.jpeg",
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl group"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt="carousel"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
        //   exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-64 md:h-96 object-cover rounded-3xl"
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none rounded-3xl" />

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-white w-6" : "bg-white/40 w-2"
            }`}
            layout
          />
        ))}
      </div>
    </div>
  );
}
