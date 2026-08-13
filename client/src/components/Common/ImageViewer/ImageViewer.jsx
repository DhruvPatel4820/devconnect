import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import styles from "./ImageViewer.module.css";

export default function ImageViewer({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") nextImage();

      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.viewer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <FiX />
        </button>

        {images.length > 1 && (
          <button className={styles.left} onClick={prevImage}>
            <FiChevronLeft />
          </button>
        )}

        <img src={images[index].url} alt="" />

        {images.length > 1 && (
          <button className={styles.right} onClick={nextImage}>
            <FiChevronRight />
          </button>
        )}

        <div className={styles.counter}>
          {index + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <div className={styles.dots}>
            {images.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === index ? styles.active : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
