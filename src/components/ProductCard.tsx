import { ProductType } from '../pages/index'
import Link from 'next/link';
import Image from 'next/image';

interface PropsType {
  product: ProductType,
  onOpenQuickView: Function,
  onAddToCart: Function
}

export default function ProductCard({ product, onOpenQuickView, onAddToCart }: PropsType) {

  return (
    <div className="group left-[10px] snap-start px-5 min-w-[320px]">
      <div className="relative mb-3">
        <Link className="flex justify-center" href={"/product-page/" + product.sku}>
          <Image alt={product.media[0].title} height={320} src={product.media[0].url} width={320} />
          {product.ribbon !== "" &&
            <div className="absolute left-0 top-0 bg-red-600 px-3 text-white text-sm">{product.ribbon}</div>
          }
        </Link>
        <button onClick={() => onOpenQuickView()} className="w-full bg-white bg-opacity-50 py-3 absolute bottom-0 transition-all duration-300 transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          Quick View
        </button>
      </div>
      <div className="relative text-center text-sm flex flex-col gap-2 bg-white z-50">
        <Link href={"/product-page/" + product.sku}>
          <div>{product.name}</div>
          <div className="border-b border-black w-5 mx-auto py-1" />
          {/* TODO: Handle discount */}
          <div className="flex justify-center py-3 gap-2">
            <div className={product.price === product.discountedPrice ? "" : "line-through"}>{product.formattedPrice}</div>
            {product.price !== product.discountedPrice &&
              <div>{product.formattedPrice}</div>
            }
          </div>
        </Link>
        <button onClick={() => onAddToCart()} className="border py-2 border-black">Add to Cart</button>
      </div>
    </div>
  )
}