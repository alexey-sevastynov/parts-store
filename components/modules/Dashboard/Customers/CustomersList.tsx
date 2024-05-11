import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { useSession } from 'next-auth/react';

import { deleteUsers } from '@/utils/dashboards';

import CustomersItem from './CustomerItem/CustomersItem';

import CustomersItemLoading from './CustomerItem/CustomersItemLoading';
import { ICustomersList } from '@/types/dashboard';
import { useLang } from '@/hooks/useLang';
import NotFoundMsg from '../NotFoundMsg';

const CustomersList = ({
  users,
  updateListUsers,
  isLoading,
}: ICustomersList) => {
  const { data } = useSession();
  const currentUserID = data?.user._id;

  const { lang, translations } = useLang();

  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleCheckboxChange = (userId: string) => {
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      [userId]: !selectedCheckboxes[userId],
    });
  };

  const handleDeleteSelectedUsers = () => {
    deleteUsers(selectedCheckboxes, currentUserID).finally(
      () => updateListUsers() // // Call the update function after deleting a user
    );

    // Clear selected checkboxes after deletion
    setSelectedCheckboxes({});
  };

  return (
    <>
      {/* if the search didn't turn up anything, */}
      {!isLoading && (!users || users.length === 0) && (
        <NotFoundMsg message={translations[lang].dashboard_page.not_found} />
      )}

      {/* if sorted User List NOT empty */}
      {isLoading ? (
        <ul className={Styles.customersList}>
          {[...Array(6)].map((_, id) => (
            <CustomersItemLoading key={id} />
          ))}
        </ul>
      ) : (
        <ul className={Styles.customersList}>
          {users?.map((user) => (
            <CustomersItem
              key={user._id}
              isChecked={selectedCheckboxes[user._id] || false}
              handleCheckboxChange={handleCheckboxChange}
              handleDeleteUser={handleDeleteSelectedUsers}
              {...user}
            />
          ))}
        </ul> // if not, than show the message "not found"
      )}
    </>
  );
};

export default CustomersList;
