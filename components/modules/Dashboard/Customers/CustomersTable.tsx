import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';

import { MdDelete } from 'react-icons/md';
import { BiSort } from 'react-icons/bi';

import { deleteSelectedUsers, deleteUser } from '@/actions/authActions';

import { COLORS } from '@/constants/colors';
import { SIZE_ICON } from '@/constants/common';

import { extractLastFiveCharacters } from '@/utils/common';

import { IUser } from '@/types/user';

import DateTranslation from './DateTranslation';

const CustomersTable = ({ users }: { users?: IUser[] }) => {
  const { data } = useSession();
  const currentUserID = data?.user._id;

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const isCheckedAll = checkboxes['all'];

  const isAnyCheckboxChecked = Object.values(checkboxes).some(
    (value) => value === true
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // If the "all" checkbox is selected, set the state of all checkboxes
    if (name === 'all') {
      const updatedCheckboxes: {
        [key: string]: boolean;
      } = {};

      // If "all" is selected, set all checkboxes to true
      if (checked) {
        users?.forEach((user) => {
          updatedCheckboxes[user._id] = true;
        });
      }

      // Update the status of the checkboxes, including the "all" checkboxes
      setCheckboxes({ ...updatedCheckboxes, all: checked });
    } else {
      // If another checkbox is selected, update its state
      const updatedCheckboxes = { ...checkboxes, [name]: checked };

      // If the selected checkbox is deselected, deselect "all".
      if (!checked) {
        updatedCheckboxes.all = false;
      } else {
        // If a checkbox is selected and there are other selected checkboxes, select "all".
        if (isAnyCheckboxChecked && name !== 'all') {
          updatedCheckboxes.all = true;
        }
      }

      // Update checkboxes status
      setCheckboxes(updatedCheckboxes);
    }
  };

  const handleBackButtonClick = () => {
    // Set the state of all checkboxes to false
    const updatedCheckboxes = { ...checkboxes };
    Object.keys(updatedCheckboxes).forEach((key) => {
      updatedCheckboxes[key] = false;
    });

    setCheckboxes(updatedCheckboxes);
  };

  const deleteUserAccount = async (id: string | undefined) => {
    if (id && id !== currentUserID) {
      await deleteUser({ id });
    }
  };

  const deleteUsers = async (
    checkboxes: { [key: string]: boolean },
    currentUserID: string | undefined
  ) => {
    if (currentUserID) await deleteSelectedUsers(checkboxes, currentUserID);
  };

  return (
    <table className={Styles.customersTable}>
      <thead>
        <tr className={Styles.customersTable__head}>
          <th className={Styles.customersTable__head_checkbox}>
            <input
              type='checkbox'
              name='all'
              checked={checkboxes['all'] || false}
              onChange={handleCheckboxChange}
            />
          </th>
          <th className={Styles.customersTable__head_name}>
            <button>
              <p>Ім'я клієнта</p>
              <BiSort />
            </button>
          </th>
          <th className={Styles.customersTable__head_id}>ID клієнта</th>
          <th className={Styles.customersTable__head_phone}>Номер телефону</th>
          <th className={Styles.customersTable__head_email}>Email</th>
          <th className={Styles.customersTable__head_block}>Блок</th>
          <th className={Styles.customersTable__head_role}>Роль</th>
          <th className={Styles.customersTable__head_created}>Створено</th>
        </tr>

        {/* PANEL DELETE, WHEN SELECT */}
        {isAnyCheckboxChecked && (
          <tr className={Styles.customersTable__head_delete}>
            <th>
              <button
                className={Styles.customersTable__head_delete_btn_red}
                onClick={() => deleteUsers(checkboxes, currentUserID)}
              >
                Видалити виділенні користувачі
              </button>
            </th>
            <th>
              {isCheckedAll && (
                <button className={Styles.customersTable__head_delete_btn_red}>
                  Видалити усі користувачі
                </button>
              )}
            </th>
            <th>
              <button
                className={Styles.customersTable__head_delete_btn}
                onClick={handleBackButtonClick}
              >
                Назад
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
        {users?.map((user) => (
          <tr
            className={Styles.customersTable__body}
            style={checkboxes[user._id] ? { backgroundColor: COLORS.grey } : {}}
            key={user._id}
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
                onChange={handleCheckboxChange}
              />
            </td>
            <td className={Styles.customersTable__body_name}>
              {user.firstName + ' ' + user.lastName}
            </td>
            <td className={Styles.customersTable__body_id}>
              {extractLastFiveCharacters(user._id || '00000')}
            </td>
            <td className={Styles.customersTable__body_phone}>
              {user.phone || 'невідомо'}
            </td>
            <td className={Styles.customersTable__body_email}>{user.email}</td>
            <td className={Styles.customersTable__body_block}>{'-'}</td>
            <td className={Styles.customersTable__body_role}>{user.role}</td>
            <td className={Styles.customersTable__body_created}>
              <DateTranslation date={user.createdAt} />
            </td>

            <td className={Styles.customersTable__body_hover}>
              <button onClick={() => deleteUserAccount(user._id)}>
                <MdDelete size={SIZE_ICON} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
