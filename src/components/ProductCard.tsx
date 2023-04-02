import { ProductType } from '../pages/index'

interface PropsType {
  product: ProductType
}

export default function ProductCard ({ product }: PropsType) {
  return (
    <div className="group left-[10px] snap-start px-5">
      <div className="relative mb-3">
        <img className="min-w-[320px]" src={product.media[0].url} />
        <button className="w-full bg-white bg-opacity-50 py-3 absolute bottom-0 transition-all duration-300 transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          Quick View
        </button>
      </div>
      <div className="relative text-center text-sm flex flex-col gap-2 bg-white z-50">
        <div>{product.name}</div>
        <div>{product.price} $</div>
        <button className="border py-2 border-black">Add to Cart</button>
      </div>
    </div>
  )
}