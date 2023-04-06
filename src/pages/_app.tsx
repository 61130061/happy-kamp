import { useState, useEffect } from 'react';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie';

import { CartPayloadType  } from '.'; 

export default function App({ Component, pageProps }: AppProps) {
  const [cartItems, setCartItems] = useState<CartPayloadType[]>([]);

  const updateCart = async (cookie: string | null) => {
    if (!cookie) {
      const cart = localStorage.getItem("cart-items");
      if (!cart) localStorage.setItem("cart-items", "[]");
      const stored = JSON.parse(localStorage.getItem("cart-items") || "[]")
      setCartItems(stored);
    } else {
      /*
        TODO: 
        - [ ] if cartItems not empty add cartItems to cart api as well so client dont have to do it again
        - [ ] handling cookie expired
      */

      // Fetch cart from api
      const res = await fetch('https://skillkamp-api.com/v1/api/cart', {
        method: 'GET',
        headers: {
          "accept": "application/json",
          'Authorization': `Bearer ${cookie}`
        } 
      });

      // TODO: What todo when request error
      if (!res.ok) {
        console.log("Not authenticated")
        return
      }

      const resData = await res.json();

      // Update fetch data from api to cartItems
      setCartItems(resData.detail.cart_list);
    }
  }

  const onAddToCart = async (payload: CartPayloadType, cookie: string | null, onCallback: Function) => {
    if (!cookie) {
      const index = cartItems.findIndex((obj) => obj.name == payload.name && obj.size == payload.size && obj.sku == payload.sku && obj.color == payload.color);

      if (index > -1) {
        const newCart = cartItems;
        newCart[index].qty+=payload.qty;
        localStorage.setItem("cart-items", JSON.stringify(newCart));
      } else {
        localStorage.setItem("cart-items", JSON.stringify([...cartItems, payload]));
      }
      
      updateCart(null);
    } else {
      const res = await fetch('https://skillkamp-api.com/v1/api/cart', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`
        },
        body: JSON.stringify(payload) 
      });

      // TODO: What todo when request error
      if (!res.ok) {
        console.log("Error: " + res.status);
        return
      }

      updateCart(cookie)
    }

    if (onCallback) onCallback();
  }

  const onDelCartItem = async (payload: CartPayloadType, cookie: string | null) => {
    if (!cookie) {
      const newCart = cartItems.filter(item => item != payload)
      localStorage.setItem("cart-items", JSON.stringify(newCart));
      updateCart(null);
    } else {
      const res = await fetch('https://skillkamp-api.com/v1/api/cart', {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`
        },
        body: JSON.stringify(payload) 
      });

      // TODO: What todo when request error
      if (!res.ok) {
        console.log(res.status)
        return
      }

      updateCart(cookie);
    }
  }

  const onUpdateQty = async (payload: CartPayloadType, old: CartPayloadType, cookie: string | null) => {
    if (!cookie) {
      // TODO: Fix duplicate item in cart
      const index = cartItems.findIndex((obj) => obj === old);

      // TODO: what to do when item not found
      if (index === -1) return

      let newCart = cartItems;
      newCart[index].qty = payload.qty;
      localStorage.setItem("cart-items", JSON.stringify(newCart));
      updateCart(null);
    } else {
      const res = await fetch('https://skillkamp-api.com/v1/api/cart', {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`
        },
        body: JSON.stringify(payload)
      });

      // TODO: What todo when request error
      if (!res.ok) {
        console.log("Error: " + res.status);
        return
      }

      updateCart(cookie)
    }
  }

  pageProps.updateCart = updateCart 
  pageProps.cartItems = cartItems;
  pageProps.onAddToCart = onAddToCart;
  pageProps.onDelCartItem = onDelCartItem;
  pageProps.onUpdateQty = onUpdateQty;
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}
