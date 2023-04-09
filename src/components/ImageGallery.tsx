import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PropsType {
  images: string[],
  updateImageIndex: Function,
  imageIndex: number
}

export default function ImageGallery({ images, imageIndex, updateImageIndex }: PropsType) {

  // Fix bug: selected image not rerender when switch between product page
  useEffect(() => {
    if (!images.includes(images[imageIndex])) {
      updateImageIndex(0);
    }
  }, [images, imageIndex, updateImageIndex])

  const handleImageClick = (index: number) => {
    updateImageIndex(index);
  }

  return (
    <div className="flex flex-col">
      <Image width={320} height={320} src={images[imageIndex]} alt="Selected image" className="w-full mb-2" />
      <div className="flex items-center gap-3">
        {images.map((image, i) => (
          <Image
            width={48}
            height={48}
            key={i}
            src={image}
            alt="Thumbnail"
            className={`w-12 h-12 cursor-pointer ${images[imageIndex] === image ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleImageClick(i)}
          />
        ))}
      </div>
    </div>
  );
}