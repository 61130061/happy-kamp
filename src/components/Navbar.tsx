import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Image from 'next/image';

import AuthModal from './AuthModal';

interface PropsType {
  onOpenCart: Function,
  cartNumber: number
}

interface UserProps {
  Token: string,
  Name: string
}

export default function Navbar ({ onOpenCart, cartNumber }: PropsType) {
  const [isLogin, setIsLogin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();

  // Prevent "serve-side" and "client-side" value differenct error
  useEffect(() => {
    if (cookies.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies])

  return (
    <div className="relative">
      <nav aria-label="navbar" className="flex md:flex-col items-center justify-between px-3 md:px-0 border-b border-gray-200">
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        <Link href="/">
          <div aria-label="top-logo" className="md:text-center text-3xl md:text-6xl font-[200] tracking-widest md:tracking-[0.2em] my-3 md:my-10">happy kids</div>
        </Link>

        {/* Big screen menu */}
        <div className="hidden max-w-4xl mx-auto md:flex items-center justify-between mb-4">
          {/* Left menu */}
          <div className="flex items-center gap-2 mr-10">
            <Link href="/">
              <button data-testid="goto-home" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/" ? " text-primary-3" : ""}`}>Home</button>
            </Link>
            <Link href="/shop-collection">
              <button data-testid="goto-shop-collection" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/shop-collection" ? " text-red-500" : ""}`}>Shop Collection</button>
            </Link>
            <Link href="/our-story">
              <button data-testid="goto-our-story" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/our-story" ? " text-red-500" : ""}`}>Our Story</button>
            </Link>
            <Link href="/contact">
              <button data-testid="goto-contact" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/contact" ? " text-red-500" : ""}`}>Contact</button>
            </Link>
          </div>

          {/* Right menu */}
          <div className="flex items-center gap-1">
            <button name="login-button" onClick={() => isLogin ? removeCookie('token') : setShowAuth(true)} className="flex items-center gap-3 p-3">
              <Image src="/icon/user-svgrepo-com.svg" width={20} height={20} alt="user" />
              <div>{isLogin ? localStorage.getItem("store-user-name") : "Login"}</div>
            </button>
            <button name="cart-button" onClick={() => onOpenCart()} className="flex items-center gap-3 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="text-sm rounded-full bg-primary-1 text-primary-2 leading-5 px-1.5">{cartNumber}</span>
            </button>
          </div>
        </div>

        {/* Burger Button for small screen */}
        <div className="flex md:hidden items-center mt-1">
          {/* Fix badge number with more bueatiful UI */}
          <button name="cart-button-mobile" onClick={() => onOpenCart()} className="flex gap-3 p-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className="text-sm rounded-full bg-primary-1 text-primary-2 leading-5 px-1.5">{cartNumber}</span>
          </button>
          <button name="burger-button" onClick={() => setToggleMenu(prev => !prev)} className="p-3 text-gray-400">
            {toggleMenu ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            }
          </button>
        </div>
      </nav>

      <div aria-label="burger-modal" className={`absolute md:hidden w-full top-auto left-auto right-auto bottom-auto bg-white z-[50] transition-all overflow-hidden duration-300 ease-in-out ${toggleMenu ? 'max-h-screen border-b' : 'max-h-0'
        }`}>
        <div className="flex flex-col border-b py-2">
          <Link href="/">
            <button data-testid="goto-home-mobile" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/" ? " text-primary-3" : ""}`}>Home</button>
          </Link>
          <Link href="/shop-collection">
            <button data-testid="goto-shop-collection-mobile" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/shop-collection" ? " text-red-500" : ""}`}>Shop Collection</button>
          </Link>
          <Link href="/our-story">
            <button data-testid="goto-our-story-mobile" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/our-story" ? " text-red-500" : ""}`}>Our Story</button>
          </Link>
          <Link href="/contact">
            <button data-testid="goto-contact-mobile" className={`hover:text-primary-3 px-8 py-3${router.pathname === "/contact" ? " text-red-500" : ""}`}>Contact</button>
          </Link>
        </div>
        <div className="flex items-center gap-2 py-2">
          <button name="login-button-mobile" onClick={() => isLogin ? removeCookie('token') : setShowAuth(true)} className="flex items-center gap-3 px-8 p-3 w-full">
            <Image src="/icon/user-svgrepo-com.svg" width={22} height={22} alt="user" />
            <div>{isLogin ? localStorage.getItem("store-user-name") : "Login"}</div>
          </button>
        </div>
      </div>
    </div>
  )
}