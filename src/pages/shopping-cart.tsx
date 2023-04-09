import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import Link from 'next/link';

import { CartPayloadType, AppPropsType, ProductType } from './index';

import Layout from '../components/Layout';

export default function ShoppingCart({
  cartItems,
  updateCart,
  onUpdateQty,
  onDelCartItem,
}: AppPropsType) {
  const [cookies] = useCookies(['token']);
  const [cart, setCart] = useState(cartItems);

  useEffect(() => {
    setCart(cartItems);
  }, [cookies, cartItems]);

  return (
    <Layout
      onUpdateQty={onUpdateQty}
      updateCart={updateCart}
      onDelCartItem={onDelCartItem}
      cartItems={cartItems}
      title="Our Story"
    >
      <div className="max-w-4xl py-14 mx-auto md:flex gap-14">
        {/* My Cart List */}
        <div className="flex-1 p-5 md:p-0">
          <div className="text-lg border-b font-[300] pb-4 mb-8">My cart</div>
          {cart.cart_list.length > 0 ? (
            <div>
              <div>
                {cart.cart_list.map((d, i) => (
                  <Item
                    onQty={(p: CartPayloadType, o: CartPayloadType) =>
                      onUpdateQty(p, o, cookies.token)
                    }
                    onDel={(d: CartPayloadType) =>
                      onDelCartItem(d, cookies.token)
                    }
                    data={d}
                    key={i}
                  />
                ))}
              </div>
              <div>
                <button className="flex gap-1 items-center text-primary-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Add a note
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 pt-16 pb-28 text-center border-b">
              <div>Cart is empty</div>
              <Link
                href="/shopping-cart"
                className="flex items-center gap-3 justify-center text-primary-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                <div>Continue Browsing</div>
              </Link>
            </div>
          )}
        </div>
        {/* Order Summary */}
        {cart.cart_list.length > 0 && (
          <div className="p-5 md:p-0 md:w-[30%]">
            <div className="text-lg border-b font-[300] pb-4 mb-8">
              Order summary
            </div>
            <div className="space-y-2 border-b pb-4 mb-4 text-sm">
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>{cart.sub_total.toFixed(2)}$</div>
              </div>
              <div>
                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>FREE</div>
                </div>
                <div className="underline">Bangkok, Thailand</div>
              </div>
              <div className="pt-3 text-primary-3">
                <button className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  Enter a promote code
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-8">
              <div>Total</div>
              <div>{cart.total.toFixed(2)}$</div>
            </div>
            <div className="flex flex-col gap-5 text-sm">
              <Link href="/checkout">
                <button className="bg-primary-1 hover:bg-primary-3 w-full text-primary-2 py-3">
                  Checkout
                </button>
              </Link>
              <button className="flex gap-1 items-center justify-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                Secure Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

interface ItemPropsType {
  data: CartPayloadType;
  onQty: Function;
  onDel: Function;
}

function Item({ data, onDel, onQty }: ItemPropsType) {
  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://skillkamp-api.com/v1/api/products/details/' + data.sku)
      .then((res) => res.json())
      .then((res) => {
        const url = (res.detail.data.catalog.product as ProductType).options
          .filter((item) => item.key == 'Color')[0]
          .selections.filter((item) => item.key == data.color)[0]
          .linkedMediaItems[0].fullUrl;

        if (url) setImg(url);
      });
  }, [data]);

  const handleUpdateQty = (isAdd: boolean) => {
    let payload = data;
    if (isAdd) {
      payload.qty = data.qty + 1;
    } else {
      payload.qty = data.qty - 1;
    }

    onQty(payload, data);
  };

  return (
    <div className="border-b flex gap-5 pb-8 mb-8 relative group">
      <button
        onClick={() => onDel(data)}
        className="absolute top-[-10px] right-[10px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-gray-400 hover:text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="relative w-32 h-32">
        {loadingImg && (
          <div className="absolute bg-gray-50 rounded-lg animate-pulse w-full h-full" />
        )}
        {img && (
          <Image
            width={128}
            height={128}
            alt={img}
            src={img}
            onLoadingComplete={() => setLoadingImg(false)}
            onError={() => setImg('/image-not-found.jpg')}
            className={`w-32`}
          />
        )}
      </div>
      <div className="flex flex-col justify-between flex-1 text-sm">
        <div>
          <div onClick={() => setLoadingImg(false)} className="text-lg mb-1">
            {data.name}
          </div>
          <div>Color: {data.color}</div>
          <div>Size: {data.size}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {data.price !== data.discountedPrice && (
              <div className="text-lg line-through">{data.price}$</div>
            )}
            <div className="text-lg">{data.discountedPrice}$</div>
          </div>
          <div className="flex items-center gap-1 w-fit border">
            <button
              onClick={() => handleUpdateQty(false)}
              disabled={data.qty == 1}
              className="px-2 py-1"
            >
              -
            </button>
            <div>{data.qty}</div>
            <button onClick={() => handleUpdateQty(true)} className="px-2 py-1">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
