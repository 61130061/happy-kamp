export default function Footer() {
  return (
    <>
      <div className="border-t border-primary-1 mt-3 mb-[37px]" />{/* Divider */}
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center text-[28px] leading-[1.6em] font-[200] tracking-widest mb-10">Logo</div>

        <div className="flex text-sm gap-5 items-start justify-between mb-[42px]">
          {/* 1st Manu */}
          <div className="flex flex-col gap-1">
            <button>Home</button>
            <button>Shop Collection</button>
            <button>Our Story</button>
            <button>Contact</button>
          </div>

          {/* Social Media */}
          <div className="flex gap-10">
            <img src={'/icon/social/facebook-svgrepo-com.svg'} width="20px" height="20px" />
            <img src={'/icon/social/pinterest-svgrepo-com.svg'} width="20px" height="20px" />
            <img src={'/icon/social/instagram-svgrepo-com.svg'} width="20px" height="20px" />
          </div>

          {/* 2nd Menu */}
          <div className="flex flex-col gap-1">
            <button>Shipping & Return</button>
            <button>Store Pobuttoncy</button>
            <button>Payment Methods</button>
            <button>FAQs</button>
          </div>
        </div>

        {/* Subscription */}
        <div className="flex flex-col items-center mb-14">
          <div className="text-[24px] my-5">Join Our Mailing List</div>
          <div className="flex gap-2">
            <input className="border" />
            <button>Subscribe Now</button>
          </div>
        </div>

        <div className="text-sm font-ligth text-center my-3">
          © 2035 by happy kids. Powered and secured by Wix
        </div>
      </div>
    </>
  )
} 