import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { useSession } from 'next-auth/react';

import { IUser } from '@/types/user';

import { deleteUsers } from '@/utils/dashboards';

import CustomersItem from './CustomerItem/CustomersItem';

import CustomersItemLoading from './CustomerItem/CustomersItemLoading';

const CustomersList = ({
  users,
  updateListUsers,
}: {
  users?: IUser[];
  updateListUsers: () => void;
}) => {
  const { data } = useSession();
  const currentUserID = data?.user._id;

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
      {/* if sorted User List NOT empty */}
      {users && users.length > 0 ? (
        <ul className={Styles.customersList}>
          {users.map((user) => (
            <CustomersItem
              key={user._id}
              isChecked={selectedCheckboxes[user._id] || false}
              handleCheckboxChange={handleCheckboxChange}
              handleDeleteUser={handleDeleteSelectedUsers}
              {...user}
            />
          ))}
        </ul> // if not, than show the message "not found"
      ) : (
        <ul className={Styles.customersList}>
          {[...Array(6)].map((_, id) => (
            <CustomersItemLoading key={id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default CustomersList;
