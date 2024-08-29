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
import { ICustomersProps } from '@/types/dashboard';
import ServerErrorMsg from '../ServerErrorMsg';

const Customers = ({ data, status, msg }: ICustomersProps) => {
  const { lang, translations } = useLang();

  const [users, setUsers] = React.useState<IUser[]>();
  const [searchResults, setSearchResults] = React.useState<IUser[]>(data);

  const isLoaded = status === 200;
  const isLoading: boolean = !Object.assign(data);

  const getUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
    setSearchResults(res.data as IUser[]);
  };

  React.useEffect(() => {
    setUsers(data);
    setSearchResults(data);
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

        {/* if loaded and status = 200 */}
        {isLoaded && (
          <div className={Styles.customers__search}>
            <SearchAdmin onSearch={handleSearch} />
          </div>
        )}
      </div>

      {/* if loaded and status = 200 */}
      {!isLoaded ? (
        <ServerErrorMsg msg={msg} status={status} />
      ) : (
        <>
          <CustomersTable users={searchResults} isLoading={isLoading} />
          <CustomersList
            users={searchResults}
            isLoading={isLoading}
            updateListUsers={getUsers}
          />
        </>
      )}
    </section>
  );
};

export default Customers;
