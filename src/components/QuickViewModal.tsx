import { ProductType } from '../pages/index';

interface PropsType {
  onClose: Function,
  product: ProductType
}

export default function QuickViewModal({ onClose, product }: PropsType) {
  return (
    <div className="fixed z-[9999] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Modal backdrop */}
        <div className="fixed inset-0 bg-black opacity-50"></div>

        {/* Modal container */}
        <div className="relative flex bg-white w-full max-w-4xl mx-auto rounded shadow-lg overflow-hidden">
          <button onClick={() => onClose()} className="absolute top-5 right-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 m-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Feature image */}
          <div className="flex-1 bg-pink-200">
            <img className="min-w-[320px]" src={product.media[0].url} />
          </div>
          {/* Feature image */}
          <div className="w-[40%] text-sm flex flex-col gap-4 px-5 py-10">
            <div className="text-2xl">{product.name}</div>
            <div className="text-2xl">{product.price}</div>
            <div>sku: {product.sku}</div>
            <div>
              <div>color:</div>
              {product.options.filter(item => item.key == "Color").map((d, i) =>
                <div key={i}>
                  <input type="radio" id={d.id} name={d.key} />
                  <label htmlFor={d.id}>{d.id}</label>
                </div>
              )}
            </div>
            <div>
              <div>size</div>
              <select>
                {product.options.filter(item => item.key == "Size").map((d, i) =>
                  <option key={i}>{d.id}</option>
                )}
              </select>
            </div>
            <div>
              <div>Quantity</div>
              <input type="number" defaultValue={1} step={1} max={product.inventory.quantity} />
            </div>
            <div className="mt-5">
              <button className="w-full py-3 border border-black">Add to cart</button>
              <div>View More Details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}