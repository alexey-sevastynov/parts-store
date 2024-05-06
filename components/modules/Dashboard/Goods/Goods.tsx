'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useLang } from '@/hooks/useLang';
import React from 'react';

import { GrUpdate } from 'react-icons/gr';

import SearchAdmin from '../SearchAdmin';
import Title from '@/components/elements/Title';

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
        </div>

        <div className={Styles.goods__search}>
          <SearchAdmin onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
};

export default Goods;
