import { useState, useEffect } from 'react';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    updateCart();
  }, [isLogin])

  const updateCart = () => {
    if (!isLogin) {
      const stored = JSON.parse(localStorage.getItem("cart-items") || '[]');
      setCartItems(stored);
    }
  }

  pageProps.updateCart = updateCart 
  pageProps.cartItems = cartItems;
  pageProps.isLogin = isLogin;
  return <Component {...pageProps} />
}
