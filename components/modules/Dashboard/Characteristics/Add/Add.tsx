import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';

import CharacteristicForm from './CharacteristicForm';

const Add = () => {
  const { lang, translations } = useLang();

  const ADD_CHARACTERISTIC_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.characteristic,
      link: ROUTES.CHARACTERISTICS,
    },
    {
      id: 2,
      name: translations[lang].common.add,
    },
  ];

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_CHARACTERISTIC_BREADCRUMBS} />
      </div>

      <CharacteristicForm />
    </section>
  );
};

export default Add;
