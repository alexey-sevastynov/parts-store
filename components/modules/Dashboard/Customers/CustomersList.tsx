import Styles from '@/styles/modules/dashboard/index.module.scss';
import { IUser } from '@/types/user';
import CustomersItem from './CustomersItem';
import React from 'react';

const CustomersList = ({ users }: { users?: IUser[] }) => {
  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  return (
    <ul className={Styles.customersList}>
      {users?.map((user) => (
        <CustomersItem
          key={user._id}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
          {...user}
        />
      ))}
    </ul>
  );
};

export default CustomersList;
