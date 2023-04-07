import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Image from 'next/image';

import { CartPayloadType, AppPropsType, ProductType } from './index';

import Layout from '../components/Layout';

export default function ShoppingCart({ 
  cartItems,
  isLogin,
  updateCart,
  onUpdateQty,
  onDelCartItem
}: AppPropsType) {
  const [cookies] = useCookies(['token']);
  const [list, setList] = useState(isLogin ? null : cartItems.cart_list);

  useEffect(() => {
    if (!isLogin) {
      setList(cartItems.cart_list);
    }
  }, [isLogin, cartItems])

  return (
    <Layout onUpdateQty={onUpdateQty} updateCart={updateCart} onDelCartItem={onDelCartItem} cartItems={cartItems} title="Our Story">
      <div className="max-w-4xl py-14 mx-auto md:flex gap-14">
        {/* My Cart List */}
        <div className="flex-1 p-5 md:p-0">
          <div className="text-lg border-b font-[300] border-black pb-4 mb-8">My cart</div>
          {list && list.length > 0 ?
            <div>
              <div>
                {cartItems.cart_list.map((d, i) =>
                  <Item onQty={(p: CartPayloadType, o: CartPayloadType) => onUpdateQty(p, o, cookies.token)} onDel={(d: CartPayloadType) => onDelCartItem(d, cookies.token)} data={d} key={i} />
                )}
              </div>
              <div>
                <div>Enter a promote code</div>
                <div>Add a note</div>
              </div>
            </div> :
            <div className="pt-16 pb-28 text-center border-b border-black">
              <div>Cart is empty</div>
              <div className="underline">Continue Browsing</div>
            </div>
          }
        </div>
        {/* Order Summary */}
        {list && list.length > 0 &&
          <div className="p-5 md:p-0 md:w-[30%]">
            <div className="text-lg border-b font-[300] border-black pb-4 mb-8">Order summary</div>
            <div className="space-y-2 border-b border-black pb-4 mb-4 text-sm">
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
            <div className="flex justify-between mb-8">
              <div>Total</div>
              <div>{cartItems.total.toFixed(2)}</div>
            </div>
            <div className="flex flex-col gap-5">
              <button className="bg-black text-white text-sm py-3">Checkout</button>
              <button>Secure Checkout</button>
            </div>
          </div>
        }
      </div>
    </Layout>
  )
}

interface ItemPropsType {
  data: CartPayloadType,
  onQty: Function,
  onDel: Function
}

function Item ({ data, onDel, onQty }: ItemPropsType) {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://skillkamp-api.com/v1/api/products/details/'+data.sku).then(res => res.json())
      .then(res => {
        const url = (res.detail.data.catalog.product as ProductType).options.filter(item => item.key == 'Color')[0].selections.filter(item => item.key == data.color)[0].linkedMediaItems[0].fullUrl

        if (url) setImg(url);
      });
  }, [data])

  const handleUpdateQty = (isAdd: boolean) => {
    let payload = data;
    if (isAdd) {
      payload.qty = data.qty + 1;
    } else {
      payload.qty = data.qty - 1;
    }

    onQty(payload, data);
  }

  return (
    <div className="border-b flex gap-5 pb-8 mb-8 relative group">
      <button onClick={() => onDel(data)} className="absolute top-[-10px] right-[10px]">x</button>
      <Image width={128} height={128} alt={img ? img : '/image-not-found.jpg'} src={img ? img : "/image-not-found.jpg"} className="w-32 border" />
      <div className="flex flex-col justify-between flex-1 text-sm">
        <div>
          <div className="text-lg mb-1">{data.name}</div>
          <div>Color: {data.color}</div>
          <div>Size: {data.size}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {data.price !== data.discountedPrice &&
              <div className="text-lg line-through">{data.price}$</div>
            }
            <div className="text-lg">{data.discountedPrice}$</div>
          </div>
          <div className="flex items-center gap-1 w-fit border">
            <button onClick={() => handleUpdateQty(false)} disabled={data.qty == 1} className="px-2 py-1">-</button>
            <div>{data.qty}</div>
            <button onClick={() => handleUpdateQty(true)} className="px-2 py-1">+</button>
          </div>
        </div>
      </div>
    </div>
  )
}