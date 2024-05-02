import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { GrUpdate } from 'react-icons/gr';
import { useLang } from '@/hooks/useLang';

import { getAllUsers } from '@/actions/authActions';
import { IUser } from '@/types/user';

import CustomersTable from './CustomersTable';
import Title from '@/components/elements/Title';
import SearchAdmin from '../SearchAdmin';

import CustomersList from './CustomersList';

const Customers = () => {
  const { lang, translations } = useLang();

  const [users, setUsers] = React.useState<IUser[]>();

  const getUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.users);
  };

  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <section className={Styles.customers}>
      <div className={Styles.customers__head}>
        <div className={Styles.customers__head_title}>
          <Title size='md'>{translations[lang].dashboard_page.all_users}</Title>
          <button onClick={getUsers}>
            <GrUpdate title={translations[lang].common.update} />
          </button>
        </div>

        <div className={Styles.customers__search}>
          <SearchAdmin />
        </div>
      </div>

      <CustomersTable users={users} />
      <CustomersList users={users} />
    </section>
  );
};

export default Customers;
