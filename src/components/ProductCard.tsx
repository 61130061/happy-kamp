import { ProductType } from '../pages/index'
import Link from 'next/link';

interface PropsType {
  product: ProductType,
  onOpenQuickView: Function
}

export default function ProductCard({ product, onOpenQuickView }: PropsType) {
  return (
    <div className="group left-[10px] snap-start px-5">
      <div className="relative mb-3">
        <Link href={"/product-page/" + product.sku}>
          <img className="min-w-[320px]" src={product.media[0].url} />
        </Link>
        <button onClick={() => onOpenQuickView()} className="w-full bg-white bg-opacity-50 py-3 absolute bottom-0 transition-all duration-300 transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          Quick View
        </button>
      </div>
      <div className="relative text-center text-sm flex flex-col gap-2 bg-white z-50">
        <Link href={"/product-page/" + product.sku}>
          <div>{product.name}</div>
          <div>{product.formattedPrice}</div>
        </Link>
        <button className="border py-2 border-black">Add to Cart</button>
      </div>
    </div>
  )
}