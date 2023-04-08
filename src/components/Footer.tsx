import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div aria-label="footer">
      <div className="border-t border-primary-1 mt-3 mb-[37px]" />{/* Divider */}
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center text-[30px] leading-[1.6em] font-[200] tracking-widest mb-10">happy kids</div>

        <div className="flex flex-col items-center sm:flex-row text-sm gap-10 sm:gap-5 sm:items-start justify-between mb-[42px]">
          {/* 1st Manu */}
          <div className="flex flex-col order-2 sm:order-none">
            <Link className="text-center" href="/">
              <button className="py-1">Home</button>
            </Link>
            <Link className="text-center" href="/shop-collection">
              <button className="py-1">Shop Collection</button>
            </Link>
            <Link className="text-center" href="/our-story">
              <button className="py-1">Our Story</button>
            </Link>
            <Link className="text-center" href="/contact">
              <button className="py-1">Contact</button>
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex gap-10 order-1 sm:order-none">
            <Image alt="facebook" src="/icon/social/facebook-svgrepo-com.svg" width={20} height={20} />
            <Image alt="pinterest" src="/icon/social/pinterest-svgrepo-com.svg" width={20} height={20} />
            <Image alt="instagram" src="/icon/social/instagram-svgrepo-com.svg" width={20} height={20} />
          </div>

          {/* 2nd Menu */}
          <div className="flex flex-col gap-1 order-3 sm:order-none">
            <button className="py-1">Shipping & Return</button>
            <button className="py-1">Store Pobuttoncy</button>
            <button className="py-1">Payment Methods</button>
            <button className="py-1">FAQs</button>
          </div>
        </div>

        {/* Subscription */}
        <div className="flex flex-col items-center mb-14">
          <div className="text-[24px] my-5">Join Our Mailing List</div>
          <div className="flex flex-col sm:flex-row w-full justify-center gap-2">
            <input className="border px-3 py-2 border-black" type="email" placeholder="Enter your email here*" />
            <button className="bg-black px-2 py-2 text-white">Subscribe Now</button>
          </div>
        </div>

        <div className="text-sm font-ligth text-center my-3">
          © 2035 by happy kids. Powered and secured by Wix
        </div>
      </div>
    </div>
  )
} 