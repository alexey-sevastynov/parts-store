'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { useParams } from 'next/navigation';
import React from 'react';

import { findUserById } from '@/actions/authActions';
import { extractLastFiveCharacters } from '@/utils/common';
import { IUser } from '@/types/user';
import { IBrand } from '@/types/brand';
import { getBrandById } from '@/actions/brandActions';
import BrandInfo from './BrandInfo';

const Brand = ({ data }: { data: IBrand }) => {
  const params = useParams();

  const { lang, translations } = useLang();
  const [brand, setBrand] = React.useState<IBrand>(data);

  const id = Array.isArray(params.id) ? params.id.join(', ') : params.id;

  const CUSTOMER_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.brands,
      link: ROUTES.BRANDS,
    },
    {
      id: 2,
      name: id,
    },
  ];

  const getBrand = async (id: string) => {
    const res = await getBrandById(id);
    setBrand(res?.brand as IBrand);
  };

  return (
    <div className={Styles.customer}>
      <div className={Styles.customer__head}>
        <Breadcrumbs items={CUSTOMER_BREADCRUMBS} />
      </div>

      <BrandInfo brand={brand} getBrand={getBrand} />
    </div>
  );
};

export default Brand;
