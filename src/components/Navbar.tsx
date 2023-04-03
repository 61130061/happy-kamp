import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar () {
  const router = useRouter();

  return (
    <nav className="border-b border-gray-200">
      <h1 className="text-center font-[200] tracking-[0.2em] my-10">Logo</h1>

      <div className="max-w-4xl mx-auto flex items-center justify-between mb-4">
        {/* Left menu */}
        <div className="flex gap-2">
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
        <div className="flex gap-2">
          <button className="flex gap-5 p-3">
            <img src="/icon/user-svgrepo-com.svg" width="25px" />
            <div>Login</div>
          </button>
          <button className="flex gap-5 p-3">Cart <span>0</span></button>
        </div>
      </div>
    </nav>
  )
}