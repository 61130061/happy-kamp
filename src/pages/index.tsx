import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export interface AppPropsType {
  cartItems: unknown[],
  isLogin: boolean,
  updateCart: Function
}

export interface ProductType {
  id: string,
  name: string,
  price: number,
  formattedPrice: string,
  discountedPrice: number,
  urlPart: string,
  sku: string,
  inventory: {
    quantity: number
  },
  options: Array<{
    id: string,
    key: string
  }>,
  media: Array<{
    url: string,
    index: number,
    mediaType: string,
    altText: string | null,
    title: string
  }>
}

export const getServerSideProps: GetServerSideProps<{ newProducts: ProductType[], landImgs: string[] }> = async (context) => {
  const resNewProducts = await fetch('https://skillkamp-api.com/v1/api/products/new_arrivals');
  const resLandImgs = await fetch('https://skillkamp-api.com/v1/api/images/landing');

  const newProducts = await resNewProducts.json();
  const landImgs = await resLandImgs.json();

  return {
    props: {
      newProducts: newProducts.detail.data.catalog.category.productsWithMetaData.list,
      landImgs: landImgs.detail
    },
  }
}


export default function Home ({ 
  newProducts, 
  landImgs, 
  cartItems, 
  updateCart,
  isLogin
}: InferGetServerSidePropsType<typeof getServerSideProps> & AppPropsType) {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);

  return (
    <Layout cartItems={cartItems}>
      <>
        {quickViewProduct &&
          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        }

        <Carousel images={landImgs} />

        {/* New Arrivavls */}
        <div className="py-5">
          <div className="text-3xl mt-10 mb-5 text-center">New Arrivals</div>
          <div className="flex hide-scrollbar overflow-x-scroll snap-mandatory snap-x px-8 pb-4">
            {newProducts.map((d, i) =>
              <ProductCard key={i} onOpenQuickView={() => setQuickViewProduct(d)} product={d} />
            )}
          </div>
          <div className="flex justify-center mt-14">
            <button>Shop All</button>
          </div>
        </div>
      </>
    </Layout>
  )
}
