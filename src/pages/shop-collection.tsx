import { useState } from 'react';
import ReactSlider from 'react-slider';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { ProductType, AppPropsType } from './index';

import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import Accordion from '../components/Accordion';
import QuickViewModal from '../components/QuickViewModal';

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

export default function ShopCollection ({ 
  products,
  filters,
  cartItems,
  onAddToCart,
  onDelCartItem
}: InferGetServerSidePropsType<typeof getServerSideProps> & AppPropsType) {
  const getMaxPrice = () => {
    return filters[1].values.reduce((max, obj) => (parseFloat(obj.key) > max ? parseFloat(obj.key) : max), 0)
  }

  const getMinPrice = () => {
    return filters[1].values.reduce((min, obj) => (parseFloat(obj.key) < min ? parseFloat(obj.key) : min), 0)
  }

  const [price, setPrice] = useState([getMinPrice(), getMaxPrice()]);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);
  const [colors, setColors] = useState([]);

  return (
    <Layout onDelCartItem={onDelCartItem} cartItems={cartItems} title="Shop Collection">
      {quickViewProduct &&
        <QuickViewModal onAddToCart={onAddToCart} sku={quickViewProduct.sku} onClose={() => setQuickViewProduct(null)} />
      }
      <div className="max-w-7xl mx-auto">
        <div className="text-3xl text-center my-10">Shop Collection</div>
        <div className="flex mb-10">
          <div className="w-[240px] p-[20px]">
            <div className="text-2xl border-b border-primary-1 pb-[18px]">Filter by</div>
            {/* Collectionn Filter */}
            <Accordion title="Collection">
              <div className="mt-2 text-sm">
                {filters[0].values.map((d, i) =>
                  <div key={i}>{d.value}</div>
                )}
              </div>
            </Accordion>
            {/* Price Filter */}
            <Accordion title="Price">
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
            </Accordion>
            {/* Color Filter */}
            <Accordion title="Color">
              <div className="flex gap-3 flex-wrap pb-1 pt-3 px-1">
                {filters[2].values.map((d, i) =>
                  <div key={i}>
                    <input id={d.key} className="peer sr-only" type="checkbox" />
                    <label htmlFor={d.key} className="w-5 h-5 border-2 border-gray-100 block peer-checked:ring-1 ring-offset-2 ring-black rounded-full" style={{ backgroundColor: d.key }} />
                  </div>
                )}
              </div>
            </Accordion>
            {/* Size Filter */}
            <Accordion title="Size">
              <div className="text-sm mt-2">
                {filters[3].values.map((d, i) =>
                  <label key={i} className="flex hover:cursor-pointer items-center gap-3">
                    <input type="checkbox" />
                    <div>{d.key}</div>
                  </label>
                )}
              </div>
            </Accordion>
            {/* Clear Filter */}
            <div className="text-sm py-[20px]">
              <button>Clear Filters x</button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-y-5">
            {products.map((d, i) =>
              <ProductCard onAddToCart={() => setQuickViewProduct(d)} key={i} product={d} onOpenQuickView={() => setQuickViewProduct(d)} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}