import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

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
      <nav className="flex md:flex-col items-center justify-between px-3 md:px-0 border-b border-gray-200">
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        <Link href="/">
          <div className="text-center text-4xl md:text-7xl font-[200] tracking-[0.2em] my-3 md:my-10">Logo</div>
        </Link>

        {/* Big screen menu */}
        <div className="hidden max-w-4xl mx-auto md:flex items-center justify-between mb-4">
          {/* Left menu */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/" ? " text-primary-3" : ""}`}>Home</button>
            </Link>
            <Link href="/shop-collection">
              <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/shop-collection" ? " text-red-500" : ""}`}>Shop Collection</button>
            </Link>
            <Link href="/our-story">
              <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/our-story" ? " text-red-500" : ""}`}>Our Story</button>
            </Link>
            <Link href="/contact">
              <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/contact" ? " text-red-500" : ""}`}>Contact</button>
            </Link>
          </div>

          {/* Right menu */}
          <div className="flex items-center gap-2">
            <button onClick={() => isLogin ? removeCookie('token') : setShowAuth(true)} className="flex items-center gap-3 p-3">
              <img src="/icon/user-svgrepo-com.svg" width="22px" />
              <div>{isLogin ? localStorage.getItem("store-user-name") : "Login"}</div>
            </button>
            <button onClick={() => onOpenCart()} className="flex gap-3 p-3">Cart <span>[{cartNumber}]</span></button>
          </div>
        </div>

        {/* Burger Button for small screen */}
        <div className="flex md:hidden items-center mt-2">
          {/* Fix badge number with more bueatiful UI */}
          <button onClick={() => onOpenCart()} className="flex gap-3 p-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span>[{cartNumber}]</span>
          </button>
          <button onClick={() => setToggleMenu(prev => !prev)} className="p-3 text-gray-400">
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

      <div className={`absolute md:hidden w-full top-auto left-auto right-auto bottom-auto bg-white z-[99] border-b transition-all overflow-hidden duration-300 ease-in-out ${toggleMenu ? 'max-h-screen' : 'max-h-0'
        }`}>
        <div className="flex flex-col border-b py-2">
          <Link href="/">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/" ? " text-primary-3" : ""}`}>Home</button>
          </Link>
          <Link href="/shop-collection">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/shop-collection" ? " text-red-500" : ""}`}>Shop Collection</button>
          </Link>
          <Link href="/our-story">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/our-story" ? " text-red-500" : ""}`}>Our Story</button>
          </Link>
          <Link href="/contact">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/contact" ? " text-red-500" : ""}`}>Contact</button>
          </Link>
        </div>
        <div className="flex items-center gap-2 py-2">
          <button onClick={() => isLogin ? removeCookie('token') : setShowAuth(true)} className="flex items-center gap-3 px-8 p-3 w-full">
            <img src="/icon/user-svgrepo-com.svg" width="22px" />
            <div>{isLogin ? localStorage.getItem("store-user-name") : "Login"}</div>
          </button>
        </div>
      </div>
    </div>
  )
}