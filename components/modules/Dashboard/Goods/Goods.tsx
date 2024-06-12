'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useLang } from '@/hooks/useLang';
import React from 'react';

import { GrUpdate } from 'react-icons/gr';

import SearchAdmin from '../SearchAdmin';
import Title from '@/components/elements/Title';
import Link from 'next/link';
import { ROUTES } from '@/constants/common';
import { BsPlusCircleFill } from 'react-icons/bs';
import ListAddedGoods from './ListAddedGoods';
import { IGoodsProps } from '@/types/brand';
import { IProduct } from '@/types/goods';
import { getAllProducts } from '@/actions/goodsActions';

const Goods = ({ data, status, msg }: IGoodsProps) => {
  const { lang, translations } = useLang();

  const [products, setProducts] = React.useState<IProduct[]>(data);
  const [searchResults, setSearchResults] = React.useState<IProduct[]>(data);

  const isEmptyProducts = data.length === 0;
  const isEmptySearchResulProducts = searchResults.length === 0;

  const isLoaded = status === 200;
  const isLoading: boolean = !Object.assign(data);

  const handleSearch = (query: string) => {
    if (!products) return [];

    if (!query) {
      setSearchResults(products); // If the query is empty, show all users
    } else {
      const filteredProducts = products.filter((product) => {
        return (
          product.name[lang].toLowerCase().includes(query.toLowerCase()) ||
          product.brand.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.name[lang]
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
      setSearchResults(filteredProducts);
    }
  };

  const getProducts = async () => {
    try {
      const res = await getAllProducts();

      setProducts(res.products as IProduct[]);
      setSearchResults(res.products as IProduct[]);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <section className={Styles.goods}>
      <div className={Styles.goods__head}>
        <div className={Styles.goods__head_title}>
          <Title size='md'>{translations[lang].dashboard_page.goods}</Title>
          <button onClick={getProducts}>
            <GrUpdate title={translations[lang].common.update} />
          </button>
          <Link
            href={ROUTES.GOODS_ADD}
            className={Styles.brands__head_title_btn_add}
          >
            <BsPlusCircleFill title={translations[lang].common.add} />
          </Link>
        </div>

        <div className={Styles.goods__search}>
          <SearchAdmin
            onSearch={handleSearch}
            placeholder={
              translations[lang].dashboard_page.search_placeholder_products
            }
          />
        </div>
      </div>

      <div className={Styles.goods__list}>
        <ListAddedGoods
          isEmptyProducts={isEmptyProducts}
          isEmptySearchResulProducts={isEmptySearchResulProducts}
          goods={searchResults}
          isLoading={isLoading}
          updateList={getProducts}
        />
      </div>
    </section>
  );
};

export default Goods;
