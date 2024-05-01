import Styles from '@/styles/modules/dashboard/index.module.scss';
import SearchAdmin from '../SearchAdmin';
import Title from '@/components/elements/Title';
import { BiSort } from 'react-icons/bi';
import { deleteUser, getAllUsers } from '@/actions/authActions';
import React, { ChangeEvent } from 'react';
import { IUser } from '@/types/user';
import { extractLastFiveCharacters } from '@/utils/common';
import DateTranslation from './DateTranslation';
import { MdDelete } from 'react-icons/md';
import { SIZE_ICON } from '@/constants/common';
import { COLORS } from '@/constants/colors';
import { useAppDispatch } from '@/context/hooks';

const CustomersTable = () => {
  const dispatch = useAppDispatch();

  const [users, setUsers] = React.useState<IUser[]>();
  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === 'all') {
      // Если выбран чекбокс "все", устанавливаем состояние всех чекбоксов
      const updatedCheckboxes: {
        [key: string]: boolean;
      } = {};
      if (checked) {
        // Если "все" выбран, устанавливаем все чекбоксы в true
        users?.forEach((user) => {
          updatedCheckboxes[user._id] = true;
        });
      }
      setCheckboxes({ ...updatedCheckboxes, all: checked });
    } else {
      // Если выбран другой чекбокс, обновляем его состояние
      setCheckboxes({ ...checkboxes, [name]: checked });
    }
  };

  const getUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.users);
  };

  const deleteUserAccount = async (id: string | undefined) => {
    if (id) {
      await deleteUser({ id });
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const isCheckedAll = checkboxes['all'];

  console.log(checkboxes, isCheckedAll);

  return (
    <section className={Styles.customersTable}>
      <div className={Styles.customersTable__head}>
        <Title size='md' className={Styles.customersTable__head_title}>
          Усі користувачі
        </Title>
        <SearchAdmin />
      </div>

      <table className={Styles.customersTable__table}>
        <thead>
          <tr className={Styles.customersTable__table_head}>
            <th className={Styles.customersTable__table_head_checkbox}>
              <input
                type='checkbox'
                name='all'
                checked={checkboxes['all'] || false}
                onChange={handleCheckboxChange}
              />
            </th>
            <th className={Styles.customersTable__table_head_name}>
              <button>
                <p>Ім'я клієнта</p>
                <BiSort />
              </button>
            </th>
            <th className={Styles.customersTable__table_head_id}>ID клієнта</th>
            <th className={Styles.customersTable__table_head_phone}>
              Номер телефону
            </th>
            <th className={Styles.customersTable__table_head_email}>Email</th>
            <th className={Styles.customersTable__table_head_block}>Блок</th>
            <th className={Styles.customersTable__table_head_role}>Роль</th>
            <th className={Styles.customersTable__table_head_created}>
              Створено
            </th>
          </tr>

          <tr className={Styles.customersTable__table_head_line}>
            <td />
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr
              className={Styles.customersTable__table_body}
              style={
                checkboxes[user._id] ? { backgroundColor: COLORS.grey } : {}
              }
              key={user._id}
            >
              <td
                className={`${Styles.customersTable__table_body_checkbox} ${
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
              <td className={Styles.customersTable__table_body_name}>
                {user.firstName + ' ' + user.lastName}
              </td>
              <td className={Styles.customersTable__table_body_id}>
                {extractLastFiveCharacters(user._id || '00000')}
              </td>
              <td className={Styles.customersTable__table_body_phone}>
                {user.phone || 'невідомо'}
              </td>
              <td className={Styles.customersTable__table_body_email}>
                {user.email}
              </td>
              <td className={Styles.customersTable__table_body_block}>{'-'}</td>
              <td className={Styles.customersTable__table_body_role}>
                {user.role}
              </td>
              <td className={Styles.customersTable__table_body_created}>
                <DateTranslation date={user.createdAt} />
              </td>

              <td className={Styles.customersTable__table_body_hover}>
                <button onClick={() => deleteUserAccount(user._id)}>
                  <MdDelete size={SIZE_ICON} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CustomersTable;
