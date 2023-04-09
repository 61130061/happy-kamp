import React, { useEffect, useState } from 'react';
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
  updateCart,
  onUpdateQty,
  onDelCartItem
}: InferGetServerSidePropsType<typeof getServerSideProps> & AppPropsType) {
  const getMinMaxPrice = () => {
    const keys = filters[1].values.map(obj => parseFloat(obj.key));

    return [Math.min(...keys), Math.max(...keys)];
  }
  const initFilter = {
    CATEGORY: 'All Products',
    PRICE: `${getMinMaxPrice()[0]}-${getMinMaxPrice()[1]}`,
    OPTION_COLOR: '',
    OPTION_LIST: ''
  }
  const [showProducts, setShowProducts] = useState<ProductType[]>(products);
  const [price, setPrice] = useState(getMinMaxPrice());
  const [filter, setFilter] = useState(initFilter);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    // TODO: Fix fetch is deplicated with getServerSideProps when render page
    const params = new URLSearchParams(
      // filter only used filter
      Object.entries(filter).filter(([_, value]) => value != null && value !== "").reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    ).toString();
    fetch('https://skillkamp-api.com/v1/api/products/?' + params).then(res => res.json())
      .then(data => {
        setShowProducts(data.detail.data.catalog.category.productsWithMetaData.list);
      })
  }, [filter])

  const onUpdateCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, CATEGORY: e.target.id });
  }

  const onClearFilter = () => {
    setFilter(initFilter);
    setPrice(getMinMaxPrice());
  }

  const onUpdateColor = (colorValue: string) => {
    const optionArr = filter.OPTION_COLOR.split(',');
    if (optionArr.includes(colorValue)) {
      const index = optionArr.findIndex(ele => ele === colorValue);
      optionArr.splice(index, 1);

    } else {
      optionArr.push(colorValue);
    }
    setFilter(prev => ({ ...prev, OPTION_COLOR: optionArr.join(',') }))
  }

  const onUpdateSize = (sizeValue: string) => {
    const optionArr = filter.OPTION_LIST.split(',');
    if (optionArr.includes(sizeValue)) {
      const index = optionArr.findIndex(ele => ele === sizeValue);
      optionArr.splice(index, 1);
    } else {
      optionArr.push(sizeValue);
    }
    setFilter(prev => ({ ...prev, OPTION_LIST: optionArr.join(',') }))
  }

  return (
    <Layout onUpdateQty={onUpdateQty} updateCart={updateCart} onDelCartItem={onDelCartItem} cartItems={cartItems} title="Shop Collection">
      {quickViewProduct &&
        <QuickViewModal onAddToCart={onAddToCart} sku={quickViewProduct.sku} onClose={() => setQuickViewProduct(null)} />
      }
      <div className="max-w-7xl mx-auto">
        <div className="text-3xl text-center my-10">Shop Collection</div>
        <div className="md:flex mb-10">

          <div className="w-full md:w-[180px] lg:w-[240px] p-[20px]">
            <div onClick={() => console.log(filter)} className="text-2xl border-b pb-[18px]">Filter by</div>
            {/* Collectionn Filter */}
            <Accordion title="Collection">
              <div className="flex flex-col-reverse mt-2 text-sm">
                {filters[0].values.map((d, i) =>
                  <div key={i} className="p-1">
                    <input onChange={onUpdateCategory} className="peer sr-only" type="radio" value={d.value} checked={d.value === filter.CATEGORY} id={d.value} name="category" />
                    <label className="peer-checked:font-semibold py-1 hover:cursor-pointer" htmlFor={d.value}>{d.value}</label>
                  </div>
                )}
              </div>
            </Accordion>
            {/* Price Filter */}
            <Accordion title="Price">
              <div className="pt-5 pb-3">
                {/* TODO: fix slider not rerender when clear filter */}
                <ReactSlider
                  value={price}
                  minDistance={0.1}
                  step={0.1}
                  min={getMinMaxPrice()[0]}
                  max={getMinMaxPrice()[1]}
                  onChange={(s) => setPrice(s)}
                  onAfterChange={(s) => setFilter(prev => ({ ...prev, PRICE: `${s[0]}-${s[1]}` }))}
                  thumbClassName="w-3 h-3 hover:cursor-pointer top-[-5px] bg-primary-1 rounded-full"
                  trackClassName="track"
                />
                <div className="flex text-sm justify-between mt-3">
                  <div>{price[0].toFixed(2)}$</div>
                  <div>{price[1].toFixed(2)}$</div>
                </div>
              </div>
            </Accordion>
            {/* Color Filter */}
            <Accordion title="Color">
              <div className="flex gap-3 flex-wrap pb-1 pt-3 px-1">
                {filters[2].values.map((d, i) =>
                  <div key={i}>
                    <input onChange={() => onUpdateColor(d.value)} checked={filter.OPTION_COLOR.split(',').includes(d.value)} id={d.key} className="peer sr-only" type="checkbox" />
                    <label htmlFor={d.key} className="w-5 h-5 border-2 border-gray-100 block peer-checked:ring-1 ring-offset-2 ring-primary-1 rounded-full" style={{ backgroundColor: d.key }} />
                  </div>
                )}
              </div>
            </Accordion>
            {/* Size Filter */}
            <Accordion title="Size">
              <div className="text-sm mt-2">
                {filters[3].values.map((d, i) =>
                  <label key={i} className="flex hover:cursor-pointer items-center gap-3 px-2 py-0.5">
                    <input onChange={() => onUpdateSize(d.value)} checked={filter.OPTION_LIST.split(',').includes(d.value)} type="checkbox" />
                    <div>{d.key}</div>
                  </label>
                )}
              </div>
            </Accordion>
            {/* Clear Filter */}
            {JSON.stringify(initFilter) !== JSON.stringify(filter) &&
              <div className="text-sm py-[20px]">
                <button onClick={onClearFilter}>Clear Filters x</button>
              </div>
            }
          </div>

          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-5">
            {showProducts.map((d, i) =>
              <ProductCard index={i} onAddToCart={() => setQuickViewProduct(d)} key={i} product={d} onOpenQuickView={() => setQuickViewProduct(d)} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}