'use client';

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
import { extractLastFiveCharacters } from '@/utils/common';

const Customers = () => {
  const { lang, translations } = useLang();

  const [users, setUsers] = React.useState<IUser[]>();
  const [searchResults, setSearchResults] = React.useState<IUser[]>();

  const getUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.users);
    setSearchResults(res.users);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (query: string) => {
    if (!users) return [];

    if (!query) {
      setSearchResults(users); // If the query is empty, show all users
    } else {
      const filteredUsers = users.filter((user) => {
        const code = extractLastFiveCharacters(user._id);
        return (
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          code.toLowerCase().includes(query.toLowerCase())
        );
      });
      setSearchResults(filteredUsers);
    }
  };

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
          <SearchAdmin onSearch={handleSearch} />
        </div>
      </div>

      <CustomersTable users={searchResults} />
      <CustomersList users={searchResults} updateListUsers={getUsers} />
    </section>
  );
};

export default Customers;
