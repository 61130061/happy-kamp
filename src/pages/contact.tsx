import Layout from '../components/Layout';

import { AppPropsType } from './index';

export default function Contact ({ 
  cartItems, 
  onDelCartItem, 
  updateCart,
  onUpdateQty
}: AppPropsType) {

  return (
    <Layout onUpdateQty={onUpdateQty} updateCart={updateCart} onDelCartItem={onDelCartItem} cartItems={cartItems} title="Contact">
      <div className="max-w-3xl mx-auto">
        <div>
          <div className="text-3xl text-center my-10">Contact Us</div>
          <div className="flex flex-wrap justify-center gap-y-14 md:justify-between text-center py-5">
            <div className="w-[240px]">
              <div className="mb-5 font-[300]">VISIT US</div>
              <div>
                <div>500 Terry Francois St.</div>
                <div>San Francisco, CA 94158</div>
                <div>123-456-7890</div>
              </div>
            </div>

            <div className="w-[240px]">
              <div className="mb-5 font-[300]">OPENING HOURS</div>
              <div>
                <div>Mon - Fri: 7am - 10pm</div>
                <div>Saturday: 8am - 10pm</div>
                <div>​Sunday: 8am - 11pm</div>
              </div>
            </div>

            <div className="w-[240px]">
              <div className="mb-5 font-[300]">CUSTOMER SERVICE</div>
              <div>
                <div>1-800-000-000</div>
                <div>123-456-7890</div>
                <div>info@mysite.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-5 md:px-0">
          <div className="text-center mb-10">FOR ANY QUESTIONS, PLEASE SEND US A MESSAGE</div>
          <form>
            <div className="flex flex-col sm:flex-row gap-5 mb-2">
              <div className="flex flex-1 flex-col gap-2">
                <label>First Name</label>
                <input className="border-b focus:outline-none focus:border-primary-1 hover:border-primary-1" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label>Last Name</label>
                <input className="border-b focus:outline-none focus:border-primary-1 hover:border-primary-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label>Email</label>
              <input className="border-b focus:outline-none focus:border-primary-1 hover:border-primary-1" />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label>Subject</label>
              <input className="border-b focus:outline-none focus:border-primary-1 hover:border-primary-1" />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label>Message</label>
              <textarea rows={4} className="border-b focus:outline-none focus:border-primary-1 hover:border-primary-1" />
            </div>
            <div className="flex justify-center mt-3">
              <button className="px-8 py-2">Submit</button>
            </div>
          </form>
        </div>

        {/* TODO: Add map using GEOAPIFY */}
      </div>
    </Layout>
  )
}