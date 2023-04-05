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
  const [isShow, setIsShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();

  useEffect(() => {
    if (cookies.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies])

  return (
    <nav className="border-b border-gray-200">
      <AuthModal isOpen={isShow} onClose={() => setIsShow(false)} />
      <h1 className="text-center font-[200] tracking-[0.2em] my-10">Logo</h1>

      <div className="max-w-4xl mx-auto flex items-center justify-between mb-4">
        {/* Left menu */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/" ? " text-primary-3":""}`}>Home</button>
          </Link>
          <Link href="/shop-collection">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/shop-collection" ? " text-red-500":""}`}>Shop Collection</button>
          </Link>
          <Link href="/our-story">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/our-story" ? " text-red-500":""}`}>Our Story</button>
          </Link>
          <Link href="/contact">
            <button className={`hover:text-primary-3 px-8 py-3${router.pathname === "/contact" ? " text-red-500":""}`}>Contact</button>
          </Link>
        </div>

        {/* Right menu */}
        <div className="flex items-center gap-2">
          <button onClick={() => isLogin ? removeCookie('token') : setIsShow(true)} className="flex items-center gap-3 p-3">
            <img src="/icon/user-svgrepo-com.svg" width="22px" />
            <div>{isLogin ? localStorage.getItem("store-user-name") : "Login"}</div>
          </button>
          <button onClick={() => onOpenCart()} className="flex gap-3 p-3">Cart <span>[{cartNumber}]</span></button>
        </div>
      </div>
    </nav>
  )
}