import { useState, useEffect, ReactNode } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';

import { CartPayloadType, CartType } from '@/pages';

import Footer from './Footer';
import Navbar from './Navbar';
import Annoucement from './Annoucement';
import CartModal from './CartModal';

interface PropsType {
  title?: string,
  children: ReactNode,
  onDelCartItem: Function,
  onOpenCart?: boolean,
  onUpdateQty: Function,
  updateCart: Function,
  cartItems: CartType 
}

export default function Layout ({ title, onOpenCart, children, onDelCartItem, cartItems, updateCart, onUpdateQty }: PropsType) {
  const [cookies] = useCookies(['token']);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    updateCart(cookies.token)
  }, [cookies, updateCart])
  
  useEffect(() => {
    if (onOpenCart) setIsCartOpen(onOpenCart);
  }, [onOpenCart])

  return (
    <>
      <Head>
        <title>{title ? title + ' | happy kamp' : 'happy kamp'}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#282828" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-primary-1">
        <CartModal onUpdateQty={(p: CartPayloadType, o: CartPayloadType) => onUpdateQty(p, o, cookies.token)} onDelCartItem={(d: CartPayloadType) => onDelCartItem(d, cookies.token)} cartItems={cartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Annoucement announcements={['Free Shipping Over $50', 'Get 10% Off - Use Coupon Code HAPPY123']} />
        {/* TODO: Figure out why cartItems undefined causing an error */}
        <Navbar cartNumber={cartItems.cart_list ? cartItems.cart_list.length : 0} onOpenCart={() => setIsCartOpen(true)} />
        {children}
        <Footer />
      </main>
    </>
  )
}