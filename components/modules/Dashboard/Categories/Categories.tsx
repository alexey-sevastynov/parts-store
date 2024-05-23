'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import React from 'react';

import { BsPlusCircleFill } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';

import { ROUTES } from '@/constants/common';

import { ICategory } from '@/types/category';
import { ICategoriesProps } from '@/types/dashboard';

import { getAllCategories } from '@/actions/categoryActions';

import Title from '@/components/elements/Title';
import SearchAdmin from '../SearchAdmin';
import ServerErrorMsg from '../ServerErrorMsg';
import CategoriesTable from './CategoriesTable';

const Categories = ({ data, status, msg }: ICategoriesProps) => {
  const { lang, translations } = useLang();

  const isLoaded = status === 200;
  const isLoading: boolean = !Object.assign(data);

  const [categories, setСategories] = React.useState<ICategory[]>(data);
  const [searchResults, setSearchResults] = React.useState<ICategory[]>(data);

  const getCategories = async () => {
    try {
      const res = await getAllCategories();

      setСategories(res.categories as ICategory[]);
      setSearchResults(res.categories as ICategory[]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearch = (query: string) => {
    if (!categories) return [];

    if (!query) {
      setSearchResults(categories); // If the query is empty, show all categories
    } else {
      const filteredCategories = categories.filter((category) => {
        return category.name[lang].toLowerCase().includes(query.toLowerCase());
      });
      setSearchResults(filteredCategories);
    }
  };

  return (
    <section className={Styles.categories}>
      <div className={Styles.categories__head}>
        <div className={Styles.categories__head_title}>
          <Title size='md'>
            {translations[lang].dashboard_page.categories}
          </Title>
          <button className={Styles.categories__head_title_btn_update}>
            <GrUpdate
              title={translations[lang].common.update}
              onClick={getCategories}
            />
          </button>
          <Link
            href={ROUTES.CATEGORIES_ADD}
            className={Styles.categories__head_title_btn_add}
          >
            <BsPlusCircleFill title={translations[lang].common.add} />
          </Link>
        </div>

        {/* if loaded and status = 200 */}
        {isLoaded && (
          <div className={Styles.categories__search}>
            <SearchAdmin onSearch={handleSearch} />
          </div>
        )}
      </div>

      {/* if loaded and status = 200 */}
      {!isLoaded ? (
        <ServerErrorMsg msg={msg} status={status} />
      ) : (
        <CategoriesTable
          categories={categories}
          searchResultsCategory={searchResults}
          isLoading={isLoading}
          getCategories={getCategories}
        />
      )}
    </section>
  );
};

export default Categories;
