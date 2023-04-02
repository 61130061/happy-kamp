export default function Navbar () {
  return (
    <nav>
      <h1 className="text-center font-[200] tracking-[0.2em] my-10">Logo</h1>

      <div className="max-w-4xl mx-auto flex items-center justify-between mb-5">
        {/* Left menu */}
        <div className="flex gap-2">
          <button className="px-8 py-3">Home</button>
          <button className="px-8 py-3">Shop Collection</button>
          <button className="px-8 py-3">Our Story</button>
          <button className="px-8 py-3">Contact</button>
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