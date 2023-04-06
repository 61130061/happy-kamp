import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { AppPropsType } from './index';

import Layout from '../components/Layout';

export const getServerSideProps: GetServerSideProps<{ img: string }> = async (context) => {
  const res = await fetch('https://skillkamp-api.com/v1/api/images/story');
  const data = await res.json();

  return {
    props: {
      img: data.detail[0]
    }
  }
};

export default function OurStory({ 
  img,
  cartItems,
  updateCart,
  onUpdateQty,
  onDelCartItem
}: InferGetServerSidePropsType<typeof getServerSideProps> & AppPropsType) {
  return (
    <Layout onUpdateQty={onUpdateQty} updateCart={updateCart} onDelCartItem={onDelCartItem} cartItems={cartItems} title="Our Story">
      <>
        <img className="object-cover w-full h-[645px]" src={img} />

        <div className="flex flex-col gap-8 text-center py-14 max-w-3xl mx-auto text-sm px-5">
          <div className="text-3xl tracking-widest mb-5">Our Story</div>
          <p>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me and you can start adding your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p>
          <p>​This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.</p>
        </div>

      </>
    </Layout>
  )
}