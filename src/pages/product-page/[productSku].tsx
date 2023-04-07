import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useCookies } from 'react-cookie';

import { ProductType, AppPropsType } from '../index';

import Layout from '../../components/Layout';
import ImageGallery from '../../components/ImageGallery';
import Accordion from '../../components/Accordion';
import QuickViewModal from '../../components/QuickViewModal';

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
  cartItems,
  updateCart,
  onAddToCart,
  onUpdateQty,
  onDelCartItem
}: InferGetServerSidePropsType<typeof getServerSideProps> & AppPropsType) {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [autoCart, setAutoCart] = useState<boolean>(false);
  const [cookies] = useCookies(['token']);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!product || !selectedColor || !selectedSize) return

    const payload = {
      sku: product.sku,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      color: selectedColor,
      size: selectedSize,
      qty: quantity
    }

    onAddToCart(payload, cookies.token,() => {
      // TODO: Fix auto open cart working once
      setAutoCart(true)
    });
  }

  return (
    <Layout onUpdateQty={onUpdateQty} updateCart={updateCart} onOpenCart={autoCart} onDelCartItem={onDelCartItem} cartItems={cartItems} title={product.name}>
      {quickViewProduct &&
        <QuickViewModal onAddToCart={onAddToCart} sku={quickViewProduct.sku} onClose={() => setQuickViewProduct(null)} />
      }
      <div className="max-w-4xl mx-auto pt-14">
        <div className="md:flex px-5 md:px-0">
          {/* Left Side */}
          <div className="flex-1">
            <ImageGallery images={product.media.map(item => item.fullUrl)} />
            <div className="text-sm mt-8">{product.description}</div>
          </div>
          {/* Right Side */}
          <form onSubmit={onSubmit} className="w-full md:w-[45%] mt-5 md:mt-0 md:p-[20px] text-sm">
            <div className="text-2xl mb-2">{product.name}</div>
            <div>sku: {product.sku}</div>
            <div className="flex gap-1">
              {product.price !== product.discountedPrice &&
                <div className="text-2xl my-3 line-through">{product.formattedPrice}</div>
              }
              <div className="text-2xl my-3">{product.formattedDiscountedPrice}</div>
            </div>
            <div className="my-5">
              <div className="mb-2">color:</div>
              {product.options.filter(item => item.key == "Color")[0].selections.map((d, i) =>
                <div key={i}>
                  <input onChange={() => setSelectedColor(d.key)} type="radio" id={d.key} name="Color" required />
                  <label htmlFor={d.key}>{d.key}</label>
                </div>
              )}
            </div>
            <div className="my-5">
              <div className="mb-2">size</div>
              <select value={selectedSize ? selectedSize : ""} onChange={(e) => setSelectedSize(e.target.value)} required>
                <option value="">Select size</option>
                {product.options.filter(item => item.key == "Size")[0].selections.map((d, i) =>
                  <option key={i}>{d.key}</option>
                )}
              </select>
            </div>
            <div className="my-5">
              <div className="mb-2">Quantity</div>
              <input value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} type="number" step={1} max={product.inventory.quantity} />
            </div>
            <div className="mt-5">
              <button type="submit" className="w-full mb-3 py-3 border border-black">Add to cart</button>
              <button type="button" className="w-full mb-3 py-3 border border-black">Buy Now</button>
            </div>
            {product.additionalInfo.map((d, i) =>
              <Accordion show title={d.title} key={i}>
                <div className="py-2 text-sm">{d.description}</div>
              </Accordion>
            )}
          </form>
        </div>

        {/* Related Product */}
        <div className="mt-16">
          <div className="mb-8 text-center text-lg">RELATED PRODUCTS</div>
          <div className="flex hide-scrollbar overflow-x-scroll snap-mandatory snap-x px-8 pb-4 gap-4 text-sm">
            {relatedProducts.filter(item => item.sku != product.sku).map((d, i) =>
              <div key={i} className="snap-start border border-black text-center">
                <Link href={"/product-page/" + d.sku}>
                  <Image width={162} height={162} alt={d.media[0].title} className="min-w-[162px]" src={d.media[0].url} />
                </Link>
                <div className="p-2">
                  <Link href={"/product-page/" + d.sku}>
                    <div>{d.name}</div>
                    <div className="flex justify-center gap-1">
                      {d.price !== d.discountedPrice &&
                        <div className="line-through">{d.formattedPrice}</div>
                      }
                      <div>{d.formattedDiscountedPrice}</div>
                    </div>
                  </Link>
                  <button onClick={() => setQuickViewProduct(d)} className="bg-black text-white w-full py-2 mt-2">Add to Cart</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}