import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CartType, CartPayloadType } from '@/pages/index';

interface PropsType {
  cartItems: CartType
}

export default function Checkout ({ cartItems }: PropsType) {
  const route = useRouter();

  useEffect(() => {
    if (cartItems.cart_list.length === 0) {
      route.push('/shopping-cart');
    }
  }, [cartItems])

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Link href="/">
        <div aria-label="top-logo" className="text-center text-3xl font-[200] tracking-[0.2em] my-16">happy kids</div>
      </Link>

      <div className="flex gap-5 max-w-4xl mx-auto">
        {/* Left side */}
        <div className="flex-1 p-5 border rounded-lg">
          <Link href="/shopping-cart">{'<'} Back</Link>
          <form className="space-y-6 mt-5">
            <div className="space-y-2 text-sm">
              <div className="text-base font-[200]">Adress</div>
              <div className="flex gap-3">
                <label className="flex flex-1 gap-1 flex-col">
                  First Name
                  <input className="border rounded p-1" />
                </label>
                <label className="flex flex-1 gap-1 flex-col">
                  Last Name
                  <input className="border rounded p-1" />
                </label>
              </div>
              <label className="flex flex-1 gap-1 flex-col">
                Address
                <input className="border rounded p-1" />
              </label>
            </div>
            <div className="space-y-2 text-sm">
              <div className="text-base font-[200]">Payment</div>
              <label className="flex flex-1 gap-1 flex-col">
                Card number
                <input className="border rounded p-1" />
              </label>
              <div className="flex gap-3">
                <label className="flex flex-1 gap-1 flex-col">
                  Expiry date
                  <input className="border rounded p-1" />
                </label>
                <label className="flex flex-1 gap-1 flex-col">
                  Expiry date
                  <input className="border rounded p-1" />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button type="button" className="flex-1 py-2 rounded bg-black text-white">Pay Now</button>
              <button type="button" className="flex-1 py-2 rounded bg-blue-500 text-white">Pay with Paypal</button>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="p-5 border h-fit rounded-lg md:w-[30%]">
          <div className="text-lg border-b font-[300] pb-4 mb-8">Order summary</div>
          <div className="space-y-2 border-b pb-4 mb-4 text-sm">
            <div className="flex justify-between">
              <div>Subtotal</div>
              <div>{cartItems.sub_total.toFixed(2)}</div>
            </div>
            <div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>FREE</div>
              </div>
              <div className="underline">Bangkok, Thailand</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>Total</div>
            <div>{cartItems.total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}