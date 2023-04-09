import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { CartPayloadType, ProductType, CartType } from '../pages/index';

interface PropsType {
  isOpen: boolean,
  onClose: Function,
  onDelCartItem: Function,
  onUpdateQty: Function,
  cartItems: CartType
}

export default function CartModal ({ onUpdateQty, isOpen, onClose, cartItems, onDelCartItem }: PropsType) {
  const [isShown, setIsShown] = useState(isOpen);

  useEffect(() => {
    setIsShown(isOpen);
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsShown(false);
    }
  };

  const handleClose = () => {
    setIsShown(false);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed z-[9999] inset-0 overflow-hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div onClick={handleClose} className={`absolute inset-0 ${!isOpen && 'opacity-0'}`}></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div
            aria-label="cart-modal"
            className={`relative w-screen max-w-sm ${
              isOpen ? 'transform translate-x-0 ease-out duration-300' : 'transform translate-x-full ease-in duration-200'
            }`}
          >
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex flex-col flex-1 overflow-y-hidden">
                <div className="flex text-xl p-8 items-center bg-primary-1 text-white">
                  <button className="p-1" name="close-cart-modal" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                  <div className="text-center flex-1">Cart</div>
                </div>
                <div className="flex flex-col h-screen justify-between flex-1">
                  {/* TODO: Figure out why cartItems undefined causing an error */}
                  {cartItems.cart_list && cartItems.cart_list.length > 0 ?
                    <>
                      <div className="space-y-3 px-5 py-8 flex-1 overflow-y-scroll">
                        {cartItems.cart_list.map((d, i) =>
                          <Item onQty={onUpdateQty} onDel={onDelCartItem} data={d} key={i} />
                        )}
                      </div>
                      <div className="px-8 py-5 text-3xl">
                        <div>Subtotal</div>
                        <div>$ {cartItems.sub_total.toFixed(2)}</div>
                        <Link href="/shopping-cart"><button className="w-full text-sm p-3 bg-primary-1 text-white mt-8">View Cart</button></Link>
                      </div>
                    </> :
                    <div className="text-center my-10">Cart is empty</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShown && (
        <div
          className="fixed z-[99] inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}
    </>
  );
};


interface ItemsPropsType {
  data: CartPayloadType,
  onQty: Function,
  onDel: Function
}

function Item ({ data, onDel, onQty }: ItemsPropsType) {
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
    <div className="border flex gap-2 p-3 relative group">
      <button onClick={() => onDel(data)} className="absolute opacity-0 group-hover:opacity-100 top-1 right-3">x</button>
      <Image alt={img ? img : "/image-not-found.jpg"} src={img ? img : "/image-not-found.jpg"} width={80} height={80} />
      <div className="space-y-1 text-sm">
        <div>{data.name}</div>
        <div className="flex gap-1">
          {data.price !== data.discountedPrice && 
            <div className="line-through">{data.price}$</div>
          }
          <div>{data.discountedPrice}$</div>
        </div>
        <div className="flex items-center gap-1 w-fit border">
          <button onClick={() => handleUpdateQty(false)} disabled={data.qty == 1} className="px-2 py-1">-</button>
          <div>{data.qty}</div>
          <button onClick={() => handleUpdateQty(true)} className="px-2 py-1">+</button>
        </div>
      </div>
    </div>
  )
}