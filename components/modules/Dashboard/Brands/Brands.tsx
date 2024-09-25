'use client';

import { getAllBrands } from '@/actions/brandActions';
import Title from '@/components/elements/Title';
import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { IBrand, IBrandsProps } from '@/types/brand';
import Link from 'next/link';
import React from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';
import SearchAdmin from '@/components/modules/Dashboard/SearchAdmin';
import ListAddedBrands from '@/components/modules/Dashboard/Brands/Add/ListAddedBrands';

const Brands = ({ data, status }: IBrandsProps) => {
  const { lang, translations } = useLang();

  const [brands, setBrands] = React.useState<IBrand[]>(data);
  const [searchResults, setSearchResults] = React.useState<IBrand[]>(data);

  const isLoaded = status === 200;
  const isLoading: boolean = !Object.assign(data);

  const getBrands = async () => {
    const res = await getAllBrands();

    setBrands(res.data as IBrand[]);
    setSearchResults(res.data as IBrand[]);
  };

  const handleSearch = (query: string) => {
    if (!brands) return [];

    if (!query) {
      setSearchResults(brands);
    } else {
      const filteredBrands = brands.filter((category) => {
        return category.name.toLowerCase().includes(query.toLowerCase());
      });
      setSearchResults(filteredBrands);
    }
  };

  return (
    <section className={Styles.brands}>
      <div className={Styles.brands__head}>
        <div className={Styles.brands__head_title}>
          <Title size='md'>{translations[lang].dashboard_page.brands}</Title>
          <button className={Styles.brands__head_title_btn_update}>
            <GrUpdate
              title={translations[lang].common.update}
              onClick={getBrands}
            />
          </button>
          <Link
            href={ROUTES.BRANDS_ADD}
            className={Styles.brands__head_title_btn_add}
          >
            <BsPlusCircleFill title={translations[lang].common.add} />
          </Link>
        </div>

        {/* if loaded and status = 200 */}
        {isLoaded && (
          <div className={Styles.brands__search}>
            <SearchAdmin
              onSearch={handleSearch}
              placeholder={
                translations[lang].dashboard_page.search_placeholder_brands
              }
            />
          </div>
        )}
      </div>

      <div className={Styles.brands__list}>
        <ListAddedBrands
          brands={searchResults}
          isLoading={isLoading}
          updateList={getBrands}
        />
      </div>
    </section>
  );
};

export default Brands;
