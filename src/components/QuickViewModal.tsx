import React, { useState, useEffect } from 'react';
import { ProductType } from '../pages/index';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Image from 'next/image'

interface PropsType {
  onClose: Function,
  sku: string,
  onAddToCart: Function
}

export default function QuickViewModal({ onClose, sku, onAddToCart }: PropsType) {
  const [status, setStatus] = useState<string | null>('Loading');
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    fetchData(sku);
  }, [sku])

  const fetchData = async (sku: string) => {
    try {
      const res = await fetch('https://skillkamp-api.com/v1/api/products/details/' + sku);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      } else {
        const data = await res.json();

        if (data.detail === "SKU not found.") { // Show Product not found
          setStatus("SKU not found.");
        } else {
          setStatus(null);
          setProduct(data.detail.data.catalog.product);
        }
      }
    } catch (err) {
      console.error(`Fetch Error: ${err}`)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!product || !selectedColor || !selectedSize) return

    setStatus('Loading')

    const payload = {
      sku: product.sku,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      color: selectedColor,
      size: selectedSize,
      qty: quantity
    }

    onAddToCart(payload, cookies.token,  onClose);
  }

  return (
    <div aria-label="quick-view-modal" className="fixed z-[9999] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Modal backdrop */}
        <div className="fixed inset-0 bg-black opacity-50"></div>

        {/* Modal container */}
        <div className="relative sm:flex bg-white w-full max-w-4xl mx-auto rounded shadow-lg overflow-hidden transition-all">
          {status ?
            <div className="text-xl w-full text-center py-44">{status}</div> :
            product &&
            <>
              <button name="close-quick-view-modal" onClick={() => onClose()} className="absolute top-5 right-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 m-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Feature image */}
              <div className="flex-1 flex justify-center">
                <Image width={640} height={320} alt={product.media[0].title} className="max-w-md min-w-[320px]" src={product.media[0].fullUrl} />
              </div>

              {/* Add to Cart form */}
              <form onSubmit={onSubmit} className="sm:w-[40%] text-sm flex flex-col sm:gap-4 gap-2 px-5 sm:py-10 pb-5">
                <div className="text-2xl">{product.name}</div>
                <div className="text-2xl">{product.price}</div>
                <div>sku: {product.sku}</div>
                <div>
                  <div>color:</div>
                  {product.options.filter(item => item.key == "Color")[0].selections.map((d, i) =>
                    <div key={i}>
                      <input onChange={() => setSelectedColor(d.key)} type="radio" id={d.key} name="Color" required />
                      <label htmlFor={d.key}>{d.key}</label>
                    </div>
                  )}
                </div>
                <div>
                  <div>size</div>
                  <select value={selectedSize ? selectedSize : ""} onChange={(e) => setSelectedSize(e.target.value)} required>
                    <option value="">Select size</option>
                    {product.options.filter(item => item.key == "Size")[0].selections.map((d, i) =>
                      <option key={i}>{d.key}</option>
                    )}
                  </select>
                </div>
                <div>
                  <div>Quantity</div>
                  <input value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} type="number" step={1} max={product.inventory.quantity} />
                </div>
                <div className="mt-5">
                  <button type="submit" className="w-full py-3 border border-black">Add to cart</button>
                  <Link href={"product-page/" + product.sku}>
                    <div className="mt-3 underline">View More Details</div>
                  </Link>
                </div>
              </form>
            </>
          }
        </div>
      </div>
    </div>
  )
}