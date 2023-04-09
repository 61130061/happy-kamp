import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { CartType } from '@/pages/index';

interface PropsType {
  cartItems: CartType;
}

export default function Checkout({ cartItems }: PropsType) {
  const [success, setSuccess] = useState<boolean>(false);
  const route = useRouter();

  useEffect(() => {
    if (cartItems.cart_list.length === 0) {
      route.push('/shopping-cart');
    }
  }, [cartItems, route]);

  return (
    <>
      <Head>
        <title>checkout | happy kid</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#282828" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="w-screen h-screen md:overflow-hidden">
          <Link href="/">
            <div
              aria-label="top-logo"
              className="text-center text-3xl font-[200] tracking-[0.2em] my-5 md:my-14"
            >
              happy kids
            </div>
          </Link>

          {success ? (
            <ConfirmPage />
          ) : (
            <div className="md:flex md:flex-row flex flex-col-reverse gap-0 md:gap-5 max-w-4xl mx-auto">
              {/* Left side */}
              <div className="flex-1 p-5 md:m-0 m-3 border rounded-lg">
                <Link
                  href="/shopping-cart"
                  className="flex w-fit items-center gap-3 text-gray-400 hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  Back
                </Link>
                <form className="space-y-6 mt-5">
                  <div className="space-y-3 text-sm">
                    <div className="text-base font-[200]">Adress</div>
                    <div className="md:flex space-y-0 md:space-y-0 gap-3">
                      <label className="flex flex-1 gap-2 flex-col">
                        First Name
                        <input
                          className="border rounded px-2 py-1"
                          placeholder="Tom"
                        />
                      </label>
                      <label className="flex flex-1 gap-2 flex-col">
                        Last Name
                        <input
                          className="border rounded px-2 py-1"
                          placeholder="James"
                        />
                      </label>
                    </div>
                    <label className="flex flex-1 gap-2 flex-col">
                      Address
                      <input
                        className="border rounded px-2 py-1"
                        placeholder="23/33 NYC"
                      />
                    </label>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="text-base font-[200]">Payment</div>
                    <label className="flex flex-1 gap-2 flex-col">
                      Card number
                      <input
                        className="border rounded px-2 py-1"
                        placeholder="xxx-xxx-xxx-xxx-xxxx"
                      />
                    </label>
                    <div className="md:flex space-y-2 md:space-y-0 gap-3">
                      <label className="flex flex-1 gap-2 flex-col">
                        Expiry date
                        <input
                          className="border rounded px-2 py-1"
                          placeholder="12/24"
                        />
                      </label>
                      <label className="flex flex-1 gap-2 flex-col">
                        Expiry date
                        <input
                          className="border rounded px-2 py-1"
                          placeholder="123"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 pb-2">
                    <button
                      onClick={() => setSuccess(true)}
                      type="button"
                      className="flex gap-3 items-center justify-center flex-1 py-2.5 rounded bg-black text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      Pay Now
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded bg-blue-500 text-white"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                      >
                        <path
                          d="M9.16 13.4101C9.04 14.0801 8.55 17.2401 8.41 18.1301C8.41 18.2001 8.41 18.2201 8.3 18.2201H5.68C5.61811 18.2207 5.55681 18.2079 5.50031 18.1826C5.4438 18.1574 5.39341 18.1202 5.35259 18.0737C5.31176 18.0272 5.28146 17.9724 5.26376 17.9131C5.24605 17.8538 5.24136 17.7913 5.25 17.7301L7.31 4.61006C7.33743 4.44459 7.421 4.29361 7.54666 4.18252C7.67233 4.07142 7.83241 4.00699 8 4.00006C13.35 4.00006 13.8 3.87006 15.17 4.41006C17.28 5.23006 17.48 7.21006 16.72 9.36006C15.96 11.5101 14.17 12.5101 11.79 12.5401C10.27 12.5401 9.35 12.3001 9.14 13.4001L9.16 13.4101ZM17.8 8.33006C17.74 8.28006 17.72 8.27006 17.7 8.33006C17.6274 8.73409 17.5237 9.13193 17.39 9.52006C15.99 13.5201 12.1 13.1901 10.2 13.1901C10.1524 13.1845 10.1042 13.1888 10.0584 13.2027C10.0125 13.2165 9.97003 13.2396 9.93347 13.2705C9.89692 13.3015 9.86709 13.3396 9.84586 13.3825C9.82462 13.4254 9.81241 13.4722 9.81 13.5201C9.02 18.5201 8.81 19.5201 8.81 19.5201C8.79809 19.5754 8.79868 19.6326 8.81172 19.6877C8.82476 19.7427 8.84992 19.7942 8.88538 19.8382C8.92083 19.8823 8.96568 19.9179 9.01665 19.9425C9.06762 19.967 9.12343 19.9798 9.18 19.9801H11.42C11.5677 19.9772 11.7097 19.9226 11.8212 19.8257C11.9327 19.7289 12.0066 19.5959 12.03 19.4501C12.03 19.2601 12.03 19.6701 12.54 16.2301C12.7 15.4601 13.04 15.5401 13.54 15.5401C16.03 15.5401 17.98 14.5401 18.54 11.5401C18.726 10.9716 18.7457 10.3619 18.5969 9.78256C18.4481 9.20326 18.1369 8.67852 17.7 8.27006L17.8 8.33006Z"
                          fill="currentColor"
                        />
                      </svg>
                      Pay with Paypal
                    </button>
                  </div>
                </form>
              </div>

              {/* Order summary */}
              <div className="p-5 m-3 md:m-0 border h-fit rounded-lg md:w-[30%]">
                <div className="text-lg border-b font-[300] pb-4 mb-8">
                  Order summary
                </div>
                <div className="space-y-2 border-b pb-4 mb-4 text-sm">
                  <div className="flex justify-between">
                    <div>Subtotal</div>
                    <div>{cartItems.sub_total.toFixed(2)}$</div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div>Shipping</div>
                      <div>FREE</div>
                    </div>
                    <div className="underline">Bangkok, Thailand</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Total</div>
                  <div>{cartItems.total.toFixed(2)}$</div>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm font-ligth text-center py-8 mt-3">
            © 2035 by happy kids. Powered and secured by Wix
          </div>
        </div>
      </main>
    </>
  );
}

function ConfirmPage() {
  return (
    <div className="h-[60%] flex flex-col gap-5 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-14 h-14 text-green-400"
      >
        <path
          fillRule="evenodd"
          d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>

      <div className="text-center">
        <p>Congratulation!</p>
        <p>Your order has been placed.</p>
      </div>

      <Link href="/">
        <button className="flex gap-3 items-center justify-center p-3 text-primary-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
              clipRule="evenodd"
            />
          </svg>
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
