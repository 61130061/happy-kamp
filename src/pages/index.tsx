import { useState, useRef } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export interface AppPropsType {
  isLogin: boolean;
  cartItems: CartType;
  onAddToCart: Function;
  onDelCartItem: Function;
  onUpdateQty: Function;
  updateCart: Function;
}

export interface ProductType {
  id: string;
  description: string;
  name: string;
  ribbon: string;
  price: number;
  formattedPrice: string;
  formattedDiscountedPrice: string;
  discountedPrice: number;
  urlPart: string;
  sku: string;
  inventory: {
    quantity: number;
  };
  options: Array<{
    id: string;
    key: string;
    selections: Array<{
      id: number;
      value: string;
      key: string;
      linkedMediaItems: Array<{
        fullUrl: string;
        index: number;
      }>;
    }>;
  }>;
  media: Array<{
    url: string;
    fullUrl: string;
    index: number;
    mediaType: string;
    altText: string | null;
    title: string;
  }>;
  additionalInfo: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface CartPayloadType {
  sku: string;
  name: string;
  price: number;
  discountedPrice: number;
  color: string;
  size: string;
  qty: number;
}

export interface CartType {
  cart_list: CartPayloadType[];
  shipping: number;
  sub_total: number;
  total: number;
}

export const getServerSideProps: GetServerSideProps<{
  newProducts: ProductType[];
  landImgs: string[];
}> = async (context) => {
  const resNewProducts = await fetch(
    'https://skillkamp-api.com/v1/api/products/new_arrivals',
  );
  const resLandImgs = await fetch(
    'https://skillkamp-api.com/v1/api/images/landing',
  );

  const newProducts = await resNewProducts.json();
  const landImgs = await resLandImgs.json();

  return {
    props: {
      newProducts:
        newProducts.detail.data.catalog.category.productsWithMetaData.list,
      landImgs: landImgs.detail,
    },
  };
};

export default function Home({
  newProducts,
  landImgs,
  cartItems,
  onAddToCart,
  onDelCartItem,
  onUpdateQty,
  updateCart,
}: InferGetServerSidePropsType<typeof getServerSideProps> & AppPropsType) {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(
    null,
  );
  const newArriveEle = useRef<HTMLDivElement>(null);

  const forceScroll = (right?: boolean) => {
    if (newArriveEle.current) {
      newArriveEle.current.scrollBy({
        left: right ? -40 : 40,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Layout
      onUpdateQty={onUpdateQty}
      updateCart={updateCart}
      onDelCartItem={onDelCartItem}
      cartItems={cartItems}
    >
      <>
        {quickViewProduct && (
          <QuickViewModal
            onAddToCart={onAddToCart}
            sku={quickViewProduct.sku}
            onClose={() => setQuickViewProduct(null)}
          />
        )}

        <Carousel images={landImgs} />

        {/* New Arrivavls */}
        <div aria-label="new-arrival-section" className="relative py-5">
          <div className="text-3xl mt-10 mb-6 text-center">New Arrivals</div>
          <button
            aria-label="scroll-product-cart-backward"
            onClick={() => forceScroll(true)}
            className="absolute z-[60] p-1 md:p-3 left-3 md:left-5 h-[400px] top-[140px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            aria-label="scroll-product-cart-forward"
            onClick={() => forceScroll(false)}
            className="absolute z-[60] p-1 md:p-3 h-[400px] right-3 md:right-5 top-[140px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <div
            ref={newArriveEle}
            className="flex hide-scrollbar overflow-x-scroll snap-mandatory snap-x px-8 pb-4"
          >
            {newProducts.map((d, i) => (
              <ProductCard
                index={i}
                onAddToCart={() => setQuickViewProduct(d)}
                key={i}
                onOpenQuickView={() => setQuickViewProduct(d)}
                product={d}
              />
            ))}
          </div>
          <div className="flex justify-center mt-14">
            <Link href="/shop-collection">
              <button
                name="shop-all"
                className="py-2 px-8 hover:bg-primary-3 bg-primary-1 text-white"
              >
                Shop All
              </button>
            </Link>
          </div>
        </div>
      </>
    </Layout>
  );
}
