'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { useParams } from 'next/navigation';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import React from 'react';
import { extractLastFiveCharacters } from '@/utils/common';
import { IUser } from '@/types/user';
import { getUser } from '@/utils/dashboards';

const Customer = ({ data }: { data: IUser }) => {
  const params = useParams();

  const { lang, translations } = useLang();
  const [user, setUser] = React.useState<IUser>(data);

  const id = Array.isArray(params.id) ? params.id.join(', ') : params.id;

  const CUSTOMER_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.customers,
      link: ROUTES.CUSTOMERS,
    },
    {
      id: 2,
      name: extractLastFiveCharacters(id || '00000'),
    },
  ];

  const findUserById = async (id: string) => {
    const res = await getUser(id);
    setUser(res.data);
  };

  React.useEffect(() => {
    setUser(data);
  }, []);

  return (
    <div className={Styles.customer}>
      <div className={Styles.customer__head}>
        <Breadcrumbs items={CUSTOMER_BREADCRUMBS} />
      </div>

      <CustomerInfo user={user} getUser={findUserById} />
    </div>
  );
};

export default Customer;
