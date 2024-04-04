import Authorization from '@/components/modules/Authorization/Authorization';
import Styles from '@/styles/modules/header/index.module.scss';
import React from 'react';

const DropDownAuth = () => {
  return (
    <div className={Styles.dropDownAuth}>
      <span className={Styles.dropDownAuth__arrow} />
      <Authorization />
    </div>
  );
};

export default DropDownAuth;
