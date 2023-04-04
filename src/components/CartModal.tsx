import { useState, useEffect } from 'react';

interface PropsType {
  isLogin?: boolean,
  isOpen: boolean,
  onClose: Function,
  cartItems: unknown[]
}


export default function CartSlideOver ({ isOpen, isLogin, onClose, cartItems }: PropsType) {
  const [isShown, setIsShown] = useState(isOpen);

  useEffect(() => {
    if (!isLogin) {

    }
  }, [isLogin])

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
                  {cartItems.length > 0 ?
                    <>
                      <div className="space-y-10 px-8 flex-1 overflow-y-scroll">
                        {cartItems.map((d, i) =>
                          <div key={i}>
                            <div>name</div>
                            <div>price</div>
                            <div>Quantity</div>
                          </div>
                        )}
                      </div>
                      <div className="p-8 text-3xl">
                        <div>Subtotal</div>
                        <div>1000$</div>
                        <button className="w-full text-sm p-3 bg-primary-1 text-white mt-10">View Cart</button>
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