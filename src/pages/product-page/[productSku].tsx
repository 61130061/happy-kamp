import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { ProductType, AppPropsType } from '../index';

import Layout from '../../components/Layout';
import ImageGallery from '../../components/ImageGallery';
import Accordion from '../../components/Accordion';

interface ProductDetailType {
  id: string,
  description: string,
  sku: string,
  price: number,
  discountedPrice: number,
  formattedPrice: string,
  formattedDiscountedPrice: string,
  name: string
  media: Array<{
    index: number,
    fullUrl: string
  }>,
  options: Array<{
    key: string,
    selections: Array<{
      id: number,
      key: string
    }>
  }>,
  inventory: {
    quantity: number
  },
  additionalInfo: Array<{
    id: string,
    title: string,
    description: string
  }>
}

export const getServerSideProps: GetServerSideProps<{
  product: ProductDetailType,
  relatedProducts: ProductType[]
}> = async (context) => {
  const sku = context.params?.productSku;

  const res = await fetch(`https://skillkamp-api.com/v1/api/products/details/${sku}`);
  const data = await res.json();
  const resRelated = await fetch('https://skillkamp-api.com/v1/api/products/');
  const dataRelated = await resRelated.json();

  return {
    props: {
      product: data.detail.data.catalog.product,
      relatedProducts: dataRelated.detail.data.catalog.category.productsWithMetaData.list
    }
  }
};

export default function ProductPage({
  product,
  relatedProducts,
  cartItems
}: InferGetServerSidePropsType<typeof getServerSideProps> & AppPropsType) {

  return (
    <Layout cartItems={cartItems} title={product.name}>
      <div className="max-w-4xl mx-auto pt-14">
        <div className="flex">
          {/* Left Side */}
          <div className="flex-1">
            <ImageGallery images={product.media.map(item => item.fullUrl)} />
            <div className="text-sm mt-8">{product.description}</div>
          </div>
          {/* Right Side */}
          <div className="w-[45%] p-[20px] text-sm">
            <div className="text-2xl mb-2">{product.name}</div>
            <div>sku: {product.sku}</div>
            <div className="text-2xl my-3">{product.formattedPrice}</div>
            <div className="my-5">
              <div className="mb-2">color:</div>
              {product.options.filter(item => item.key == "Color")[0].selections.map((d, i) =>
                <div key={i}>
                  <input type="radio" id={d.key} name="Color" />
                  <label htmlFor={d.key}>{d.key}</label>
                </div>
              )}
            </div>
            <div className="my-5">
              <div className="mb-2">size</div>
              <select>
                {product.options.filter(item => item.key == "Size")[0].selections.map((d, i) =>
                  <option key={i}>{d.key}</option>
                )}
              </select>
            </div>
            <div className="my-5">
              <div className="mb-2">Quantity</div>
              <input type="number" defaultValue={1} step={1} max={product.inventory.quantity} />
            </div>
            <div className="mt-5">
              <button className="w-full mb-3 py-3 border border-black">Add to cart</button>
              <button className="w-full mb-3 py-3 border border-black">Buy Now</button>
            </div>
            {product.additionalInfo.map((d, i) =>
              <Accordion show title={d.title} key={i}>
                <div className="py-2 text-sm">{d.description}</div>
              </Accordion>
            )}
          </div>
        </div>

        {/* Related Product */}
        <div className="mt-16">
          <div className="mb-8 text-center text-lg">RELATED PRODUCTS</div>
          <div className="flex hide-scrollbar overflow-x-scroll snap-mandatory snap-x px-8 pb-4 gap-4 text-sm">
            {relatedProducts.filter(item => item.sku != product.sku).map((d, i) =>
              <div key={i} className="snap-start border border-black text-center">
                <Link href={"/product-page/" + d.sku}>
                  <img className="min-w-[162px]" src={d.media[0].url} />
                </Link>
                <div className="p-2">
                  <Link href={"/product-page/" + d.sku}>
                    <div>{d.name}</div>
                    <div>{d.formattedPrice}</div>
                  </Link>
                  <button className="bg-black text-white w-full py-2 mt-2">Add to Cart</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}