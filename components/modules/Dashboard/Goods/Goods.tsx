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

const Goods = () => {
  const { lang, translations } = useLang();

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <section className={Styles.goods}>
      <div className={Styles.goods__head}>
        <div className={Styles.goods__head_title}>
          <Title size='md'>{translations[lang].dashboard_page.goods}</Title>
          <button>
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
    </section>
  );
};

export default Goods;
