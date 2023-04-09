import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface PropsType {
  images: string[];
}

export default function Carousel({ images }: PropsType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length]);

  useEffect(() => {
    const id = window.setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (id) {
        window.clearInterval(id);
      }
    };
  }, [images.length, goToNext]);

  function goToIndex(index: number) {
    setCurrentIndex(index);
  }

  function goToPrevious() {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }

  return (
    <div aria-label="carousel" className="relative w-full h-[620px]">
      <div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item absolute w-full h-full top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out ${
              currentIndex === index ? 'opacity-100' : ''
            }`}
          >
            <Image
              priority
              width={640}
              height={640}
              src={image}
              alt={`Image ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <div className="carousel-dots absolute bottom-7 left-0 right-0 flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            aria-label={'show-slide-' + index}
            key={index}
            className={`carousel-dot w-3 h-3 rounded-full mx-2 focus:outline-none ${
              currentIndex === index ? 'bg-gray-700' : 'bg-gray-300'
            }`}
            onClick={() => goToIndex(index)}
          ></button>
        ))}
      </div>
      <button
        aria-label="previous-slide"
        className="py-5 absolute top-1/2 left-4 md:left-10 transform -translate-y-1/2 focus:outline-none"
        onClick={goToPrevious}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        aria-label="next-slide"
        className="py-5 absolute top-1/2 right-4 md:right-10 transform -translate-y-1/2 focus:outline-none"
        onClick={goToNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
