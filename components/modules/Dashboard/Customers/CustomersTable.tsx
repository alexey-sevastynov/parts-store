import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useLang } from '@/hooks/useLang';

import { MdDelete } from 'react-icons/md';
import { BiSort } from 'react-icons/bi';

import { COLORS } from '@/constants/colors';
import { ROUTES } from '@/constants/common';

import { extractLastFiveCharacters } from '@/utils/common';
import { deleteUsers, handleCheckboxChange } from '@/utils/dashboards';

import { IUser } from '@/types/user';

import Link from 'next/link';
import { ICustomersTableProps } from '@/types/dashboard';

import CustomerRowLoader from './CustomerRowLoader';
import NotFoundMsg from '../NotFoundMsg';
import DateTranslation from '@/components/elements/DateTranslation';

const CustomersTable = ({ users, isLoading }: ICustomersTableProps) => {
  const { lang, translations } = useLang();

  const { data } = useSession();
  const currentUserID = data?.user._id;

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const [sortState, setSortState] = React.useState<{
    byName: boolean;
    byBlocked: boolean;
    byRole: boolean;
    byCreated: boolean;
  }>({
    byName: false,
    byBlocked: false,
    byRole: false,
    byCreated: true,
  });

  const isCheckedAll = checkboxes['all'];

  const isAnyCheckboxChecked = Object.values(checkboxes).some(
    (value) => value === true
  );

  const handleBackButtonClick = () => {
    // Set the state of all checkboxes to false
    const updatedCheckboxes = { ...checkboxes };
    Object.keys(updatedCheckboxes).forEach((key) => {
      updatedCheckboxes[key] = false;
    });

    setCheckboxes(updatedCheckboxes);
  };

  const handleSortButtonClick = (
    sortType: 'name' | 'blocked' | 'role' | 'created'
  ) => {
    setSortState({
      byName: sortType === 'name' ? true : false,
      byBlocked: sortType === 'blocked' ? true : false,
      byRole: sortType === 'role' ? true : false,
      byCreated: sortType === 'created' ? true : false,
    });
  };

  const sortedUsers = (users: IUser[] | undefined) => {
    // If there are no users, return an empty array
    if (!users) {
      return [];
    } else {
      // Create a copy of the original user array
      const sortedUsers = [...users];

      // Function for sorting by name
      const sortByName = (a: IUser, b: IUser) => {
        return a.firstName.localeCompare(b.firstName);
      };

      // Function for sorting by blocked users
      const sortByBlocked = (a: IUser, b: IUser) => {
        return a.isBlocked === b.isBlocked ? 0 : a.isBlocked ? -1 : 1;
      };

      // Function for sorting by role
      const sortByRole = (a: IUser, b: IUser) => {
        const roleA = a.role || '';
        const roleB = b.role || '';
        return roleA.localeCompare(roleB);
      };

      // Function for sorting by creation date
      const sortByCreated = (a: IUser, b: IUser) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      };

      // Apply sorting depending on active sorting
      if (sortState.byName) {
        sortedUsers.sort(sortByName);
      }

      if (sortState.byBlocked) {
        sortedUsers.sort(sortByBlocked);
      }

      if (sortState.byRole) {
        sortedUsers.sort(sortByRole);
      }

      if (sortState.byCreated) {
        sortedUsers.sort(sortByCreated);
      }

      return sortedUsers;
    }
  };

  const sortedUserList = sortedUsers(users);

  return (
    <table className={Styles.customersTable}>
      <thead>
        <tr className={Styles.customersTable__head}>
          {/* checkbox ALL */}
          <th className={Styles.customersTable__head_checkbox}>
            <input
              type='checkbox'
              name='all'
              checked={checkboxes['all'] || false}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(
                  users,
                  event,
                  checkboxes,
                  setCheckboxes,
                  isAnyCheckboxChecked
                )
              }
              disabled={!users}
            />
          </th>

          {/* name */}
          <th className={Styles.customersTable__head_name}>
            <button
              className={sortState.byName ? Styles.btn_active : Styles.btn}
              title={translations[lang].dashboard_page.sort_by_alphabet}
              onClick={() => handleSortButtonClick('name')}
            >
              <p>{translations[lang].dashboard_page.name}</p>
              <BiSort />
            </button>
          </th>

          {/* code */}
          <th className={Styles.customersTable__head_id}>
            {translations[lang].dashboard_page.code}
          </th>

          {/* phone */}
          <th className={Styles.customersTable__head_phone}>
            {translations[lang].dashboard_page.phone}
          </th>

          {/* email */}
          <th className={Styles.customersTable__head_email}>Email</th>

          {/* blocked */}
          <th className={Styles.customersTable__head_block}>
            <button
              className={sortState.byBlocked ? Styles.btn_active : Styles.btn}
              title={translations[lang].dashboard_page.sort_by_blocked_users}
              onClick={() => handleSortButtonClick('blocked')}
            >
              <p>{translations[lang].dashboard_page.blocked}</p>
              <BiSort />
            </button>
          </th>

          {/* role */}
          <th className={Styles.customersTable__head_role}>
            <button
              className={sortState.byRole ? Styles.btn_active : Styles.btn}
              title={translations[lang].dashboard_page.sort_by_role}
              onClick={() => handleSortButtonClick('role')}
            >
              <p>{translations[lang].dashboard_page.role}</p>
              <BiSort />
            </button>
          </th>

          {/* created */}
          <th className={Styles.customersTable__head_created}>
            <button
              className={sortState.byCreated ? Styles.btn_active : Styles.btn}
              title={translations[lang].dashboard_page.sort_by_created}
              onClick={() => handleSortButtonClick('created')}
            >
              <p>{translations[lang].dashboard_page.created}</p>
              <BiSort />
            </button>
          </th>
        </tr>

        {/* PANEL DELETE, WHEN SELECT */}
        {isAnyCheckboxChecked && (
          <tr className={Styles.customersTable__head_delete}>
            <th>
              <button
                className={Styles.customersTable__head_delete_btn_red}
                onClick={() => deleteUsers(checkboxes, currentUserID)}
              >
                {translations[lang].dashboard_page.delete_selected_users}
              </button>
            </th>
            <th>
              {isCheckedAll && (
                <button className={Styles.customersTable__head_delete_btn_red}>
                  {translations[lang].dashboard_page.delete_all_users}
                </button>
              )}
            </th>
            <th>
              <button
                className={Styles.customersTable__head_delete_btn}
                onClick={handleBackButtonClick}
              >
                {translations[lang].common.cancel}
              </button>
            </th>
          </tr>
        )}

        {/* LINE */}
        <tr className={Styles.customersTable__head_line}>
          <td />
        </tr>
      </thead>

      <tbody>
        {/* if the search didn't turn up anything, */}
        {!isLoading && (!users || users.length === 0) && (
          <NotFoundMsg message={translations[lang].dashboard_page.not_found} />
        )}

        {/* if the data has not yet been downloaded */}
        {isLoading
          ? [...Array(10)].map((_, id) => <CustomerRowLoader key={id} />)
          : sortedUserList?.map((user) => {
              return (
                <tr
                  key={user._id}
                  className={Styles.customersTable__body}
                  style={
                    checkboxes[user._id] ? { backgroundColor: COLORS.grey } : {}
                  }
                >
                  <td
                    className={`${Styles.customersTable__body_checkbox} ${
                      checkboxes[user._id] && Styles.select
                    }`}
                  >
                    <input
                      type='checkbox'
                      name={user._id}
                      checked={checkboxes[user._id] || false}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleCheckboxChange(
                          users,
                          event,
                          checkboxes,
                          setCheckboxes,
                          isAnyCheckboxChecked
                        )
                      }
                    />
                  </td>
                  <td className={Styles.customersTable__body_name}>
                    <Link href={ROUTES.VIEW_CUSTOMER_BY_ID(user._id)}>
                      {user.firstName + ' ' + user.lastName}
                    </Link>
                  </td>
                  <td className={Styles.customersTable__body_id}>
                    {extractLastFiveCharacters(user._id || '00000')}
                  </td>
                  <td className={Styles.customersTable__body_phone}>
                    {user.phone || 'невідомо'}
                  </td>
                  <td className={Styles.customersTable__body_email}>
                    {user.email}
                  </td>
                  <td className={Styles.customersTable__body_block}>
                    {user.isBlocked
                      ? translations[lang].common.yes
                      : translations[lang].common.no}
                  </td>
                  <td className={Styles.customersTable__body_role}>
                    {user.role}
                  </td>
                  <td className={Styles.customersTable__body_created}>
                    <DateTranslation date={user.createdAt} />
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};

export default CustomersTable;
