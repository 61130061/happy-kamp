import { useState, useEffect } from 'react';

interface PropsType {
  images: string[]
}

export default function Carousel({ images }: PropsType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      goToNext()
    }, 5000)

    setIntervalId(id)

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [images.length])
  
  function goToIndex(index: number) {
    setCurrentIndex(index)
  }

  function goToPrevious() {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  function goToNext() {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="relative w-full h-[620px]">
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item absolute w-full h-full top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out ${currentIndex === index ? 'opacity-100' : ''
              }`}
          >
            <img src={image} alt={`Image ${index}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      <div className="carousel-dots absolute bottom-7 left-0 right-0 flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot w-3 h-3 rounded-full mx-2 focus:outline-none ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            onClick={() => goToIndex(index)}
          ></button>
        ))}
      </div>
      <button className="carousel-arrow-left absolute top-1/2 left-4 transform -translate-y-1/2 focus:outline-none" onClick={goToPrevious}>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-gray-700">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L9.83 12l5.58-5.59z"></path>
        </svg>
      </button>
      <button className="carousel-arrow-right absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none" onClick={goToNext}>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-gray-700">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L14.17 12l-5.58 5.59z"></path>
        </svg>
      </button>
    </div>
  )
}