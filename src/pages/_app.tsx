import { useState, useEffect } from 'react';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie';

import { CartPayloadType  } from '.'; 

export default function App({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [cartItems, setCartItems] = useState<CartPayloadType[]>([]);

  useEffect(() => {
    updateCart();
  }, [isLogin])

  const updateCart = () => {
    if (!isLogin) {
      const cart = localStorage.getItem("cart-items");
      if (!cart) localStorage.setItem("cart-items", "[]");
      const stored = JSON.parse(localStorage.getItem("cart-items") || "[]")
      setCartItems(stored);
    }
  }

  const onAddToCart = (payload: CartPayloadType, onCallback: Function) => {
    if (!isLogin) {
      // TODO: Fix add same item
      localStorage.setItem("cart-items", JSON.stringify([...cartItems, payload]));
      updateCart();
    }

    if (onCallback) onCallback();
  }

  const onDelCartItem = (payload: CartPayloadType) => {
    if (!isLogin) {
      const newCart = cartItems.filter(item => item != payload)
      console.log(newCart);
      localStorage.setItem("cart-items", JSON.stringify(newCart));
      updateCart();
    }
  }

  pageProps.updateCart = updateCart 
  pageProps.cartItems = cartItems;
  pageProps.onAddToCart = onAddToCart;
  pageProps.onDelCartItem = onDelCartItem;
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}
