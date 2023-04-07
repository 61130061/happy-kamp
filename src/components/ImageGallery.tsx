import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PropsType {
  images: string[]
}

export default function ImageGallery({ images }: PropsType) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Fix bug: selected image not rerender when switch between product page
  useEffect(() => {
    if (!images.includes(selectedImage)) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage])

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  }

  return (
    <div className="flex flex-col">
      <Image width={320} height={320} src={selectedImage} alt="Selected image" className="w-full mb-2" />
      <div className="flex items-center gap-3">
        {images.map((image, i) => (
          <Image
            width={48}
            height={48}
            key={i}
            src={image}
            alt="Thumbnail"
            className={`w-12 h-12 cursor-pointer ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
}