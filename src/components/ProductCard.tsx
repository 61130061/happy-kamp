import { useState } from 'react';
import { ProductType } from '../pages/index'
import Link from 'next/link';
import Image from 'next/image';

interface PropsType {
  product: ProductType,
  onOpenQuickView: Function,
  index: number,
  onAddToCart: Function
}

export default function ProductCard({ product, onOpenQuickView, onAddToCart, index }: PropsType) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  return (
    <div aria-label="product-cart" className="group left-[10px] snap-start px-5 min-w-[320px]">
      <div className="relative mb-3">
        <Link 
          onMouseEnter={() => product.media[1] && setImageIndex(1)}
          onMouseLeave={() => setImageIndex(0)}
          className="flex justify-center"
          href={"/product-page/" + product.sku}
        >
          <Image 
            alt={product.media[imageIndex].title}
            height={320}
            src={product.media[imageIndex].url}
            width={320}
          />
          {product.ribbon !== "" &&
            <div className="absolute left-0 top-0 bg-red-600 px-3 text-white text-sm">{product.ribbon}</div>
          }
        </Link>
        <button data-testid={"quick-view-button-" + index} name="quick-view-button" onClick={() => onOpenQuickView()} className="w-full bg-white bg-opacity-50 py-3 absolute bottom-0 transition-all duration-300 transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          Quick View
        </button>
      </div>
      <div className="relative text-center text-sm flex flex-col gap-2 bg-white z-50">
        <Link href={"/product-page/" + product.sku}>
          <div id="product-name">{product.name}</div>
          <div className="border-b border-black w-5 mx-auto py-1" />
          {/* TODO: Handle discount */}
          <div className="flex justify-center py-3 gap-2">
            <div className={product.price === product.discountedPrice ? "" : "line-through"}>{product.formattedPrice}</div>
            {product.price !== product.discountedPrice &&
              <div>{product.discountedPrice}</div>
            }
          </div>
        </Link>
        <button data-testid={"add-to-cart-button-"+index} name="add-to-cart" onClick={() => onAddToCart()} className="border py-2 border-black">Add to Cart</button>
      </div>
    </div>
  )
}