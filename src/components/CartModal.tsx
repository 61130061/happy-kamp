import { useState, useEffect } from 'react';
import Link from 'next/link';

import { CartPayloadType, ProductType } from '../pages/index';

interface PropsType {
  isOpen: boolean,
  onClose: Function,
  onDelCartItem: Function,
  onUpdateQty: Function,
  cartItems: CartPayloadType[]
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
            className={`relative w-screen max-w-sm ${
              isOpen ? 'transform translate-x-0 ease-out duration-300' : 'transform translate-x-full ease-in duration-200'
            }`}
          >
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex flex-col flex-1 overflow-y-hidden">
                <div className="flex text-xl py-8 px-10 items-center bg-primary-1 text-white">
                  <button onClick={handleClose}>{'>'}</button>
                  <div className="text-center flex-1">Cart</div>
                </div>
                <div className="mt-8 flex flex-col h-screen justify-between flex-1">
                  {/* TODO: Figure out why cartItems undefined causing an error */}
                  {cartItems && cartItems.length > 0 ?
                    <>
                      <div className="space-y-3 px-5 flex-1 overflow-y-scroll">
                        {cartItems.map((d, i) =>
                          <Item onQty={onUpdateQty} onDel={onDelCartItem} data={d} key={i} />
                        )}
                      </div>
                      <div className="p-8 text-3xl">
                        <div>Subtotal</div>
                        <div>$ {cartItems.reduce((acc, ele) => acc+(ele.price * ele.qty), 0).toFixed(2)}</div>
                        <Link href="/shopping-cart"><button className="w-full text-sm p-3 bg-primary-1 text-white mt-10">View Cart</button></Link>
                      </div>
                    </> :
                    <div className="text-center">Cart is empty</div>
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
      <img src={img ? img : ""} width="80px" />
      <div className="space-y-1 text-sm">
        <div>{data.name}</div>
        <div>{data.price}</div>
        <div className="flex items-center gap-1 w-fit border">
          <button onClick={() => handleUpdateQty(false)} disabled={data.qty == 1} className="px-2 py-1">-</button>
          <div>{data.qty}</div>
          <button onClick={() => handleUpdateQty(true)} className="px-2 py-1">+</button>
        </div>
      </div>
    </div>
  )
}