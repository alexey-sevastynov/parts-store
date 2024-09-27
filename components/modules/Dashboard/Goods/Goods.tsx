'use client';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import Link from 'next/link';
import React from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';
import { getAllProducts } from '@/actions/goodsActions';
import { useLang } from '@/hooks/useLang';
import Title from '@/components/elements/Title';
import { ROUTES } from '@/constants/common';
import { IGoodsProps } from '@/types/brand';
import { IProduct } from '@/types/goods';
import SearchAdmin from '../SearchAdmin';
import ListAddedGoods from './ListAddedGoods';

const Goods = ({ data }: IGoodsProps) => {
  const { lang, translations } = useLang();

  const [products, setProducts] = React.useState<IProduct[]>(data);
  const [searchResults, setSearchResults] = React.useState<IProduct[]>(data);

  const isEmptyProducts = data.length === 0;
  const isEmptySearchResulProducts = searchResults.length === 0;

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

      setProducts(res.data as IProduct[]);
      setSearchResults(res.data as IProduct[]);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <section className={Styles.goods}>
      <div className={Styles.goods__head}>
        <div className={Styles.goods__head_title}>
          <Title size='md'>{translations[lang].dashboard_page.goods}</Title>
          <button
            onClick={getProducts}
            className={Styles.goods__head_title_btn_update}
          >
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
