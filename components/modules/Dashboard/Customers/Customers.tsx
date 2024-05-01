import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { GrUpdate } from 'react-icons/gr';

import { getAllUsers } from '@/actions/authActions';
import { IUser } from '@/types/user';

import CustomersTable from './CustomersTable';
import Title from '@/components/elements/Title';
import SearchAdmin from '../SearchAdmin';

const Customers = () => {
  const [users, setUsers] = React.useState<IUser[]>();

  const getUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.users);
  };

  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <section className={Styles.customersTable}>
      <div className={Styles.customersTable__head}>
        <div className={Styles.customersTable__head_title}>
          <Title size='md'>Усі користувачі</Title>
          <button onClick={getUsers}>
            <GrUpdate title='update' />
          </button>
        </div>

        <SearchAdmin />
      </div>

      <CustomersTable users={users} />
    </section>
  );
};

export default Customers;
