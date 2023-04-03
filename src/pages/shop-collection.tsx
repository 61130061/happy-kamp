import { useState } from 'react';
import ReactSlider from 'react-slider';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { ProductType } from './index';

import Annoucement from '../components/Annoucement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

interface FilterType {
  name: string,
  field: string,
  values: Array<{
    key: string,
    value: string
  }>
}


export const getServerSideProps: GetServerSideProps<{ products: ProductType[], filters: FilterType[] }> = async (context) => {
  const resProducts = await fetch('https://skillkamp-api.com/v1/api/products/');
  const resFilter = await fetch('https://skillkamp-api.com/v1/api/filters/');

  const products = await resProducts.json();
  const filters = await resFilter.json();

  return {
    props: {
      products: products.detail.data.catalog.category.productsWithMetaData.list,
      filters: filters.data.catalog.filters,
    },
  }
}

export default function ShopCollection ({ products, filters }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const getMaxPrice = () => {
    return filters[1].values.reduce((max, obj) => (parseFloat(obj.key) > max ? parseFloat(obj.key) : max), 0)
  }

  const getMinPrice = () => {
    return filters[1].values.reduce((min, obj) => (parseFloat(obj.key) < min ? parseFloat(obj.key) : min), 0)
  }

  const [price, setPrice] = useState([getMinPrice(), getMaxPrice()]);
  const [colors, setColors] = useState([]);

  const [showCollection, setShowCollection] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showSize, setShowSize] = useState(false);

  return (
    <>
      <Head>
        <title>Shop Collection | happy kamp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#282828" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Annoucement />
        <Navbar />

        <div className="max-w-7xl mx-auto">
          <div className="text-3xl text-center my-10">Shop Collection</div>
          <div className="flex mb-10">
            <div className="w-[240px] p-[20px]">
              <div className="text-2xl border-b border-primary-1 pb-[18px]">Filter by</div>
              {/* Collectionn Filter */}
              <div className="py-[20px] border-b border-primary-1">
                <button onClick={() => setShowCollection(prev => !prev)} className="w-full py-1 flex justify-between gap-3">
                  <div>Collection</div>
                  <div>{showCollection ? '-':'+'}</div>
                </button>
                {showCollection &&
                  <div className="mt-2 text-sm">
                    {filters[0].values.map((d, i) =>
                      <div key={i}>{d.value}</div>
                    )}
                  </div>
                }
              </div>
              {/* Price Filter */}
              <div className="py-[20px] border-b border-primary-1">
                <button onClick={() => setShowPrice(prev => !prev)} className="w-full py-1 flex justify-between gap-3">
                  <div>Price</div>
                  <div>{showPrice ? '-':'+'}</div>
                </button>
                {showPrice &&
                  <div className="pt-5 pb-3">
                    <ReactSlider
                      defaultValue={price}
                      minDistance={1}
                      min={getMinPrice()}
                      max={getMaxPrice()}
                      onChange={(s) => setPrice(s)}
                      thumbClassName="w-3 h-3 hover:cursor-pointer top-[-5px] bg-black rounded-full"
                      trackClassName="track"
                    />
                    <div className="flex text-sm justify-between mt-3">
                      <div>{price[0]}$</div>
                      <div>{price[1]}$</div>
                    </div>
                  </div>
                }
              </div>
              {/* Color Filter */}
              <div className="py-[20px] border-b border-primary-1">
                <button onClick={() => setShowColor(prev => !prev)} className="w-full py-1 flex justify-between gap-3">
                  <div>Color</div>
                  <div>{showColor ? '-':'+'}</div>
                </button>
                {showColor &&
                  <div className="flex gap-3 flex-wrap pb-1 pt-3">
                    {filters[2].values.map((d, i) =>
                      <div key={i}>
                        <input id={d.key} className="peer sr-only" type="checkbox" />
                        <label htmlFor={d.key} className="w-5 h-5 border-2 border-gray-100 block peer-checked:ring-1 ring-offset-2 ring-black rounded-full" style={{ backgroundColor: d.key }} />
                      </div>
                    )}
                  </div>
                }
              </div>
              {/* Size Filter */}
              <div className="py-[20px] border-b border-primary-1">
                <button onClick={() => setShowSize(prev => !prev)} className="w-full py-1 flex justify-between gap-3">
                  <div>Size</div>
                  <div>{showSize ? '-':'+'}</div>
                </button>
                {showSize &&
                  <div className="text-sm mt-2">
                    {filters[3].values.map((d, i) =>
                      <label key={i} className="flex hover:cursor-pointer items-center gap-3">
                        <input type="checkbox" />
                        <div>{d.key}</div>
                      </label>
                    )}
                  </div>
                }
              </div>
              {/* Clear Filter */}
              <div className="text-sm py-[20px]">
                <button>Clear Filters x</button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-y-5">
              {products.map((d, i) =>
                <ProductCard key={i} product={d} onOpenQuickView={() => console.log('hi')} />
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}