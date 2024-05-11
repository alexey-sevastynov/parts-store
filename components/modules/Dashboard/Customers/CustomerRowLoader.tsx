import Styles from '@/styles/modules/dashboard/index.module.scss';

import ItemLoader from '../TableAdmin/ItemLoader';
import { CheckboxLoader } from '../TableAdmin/CheckboxLoader';

const CustomerRowLoader = () => {
  return (
    <tr className={Styles.customersTable__body}>
      <td className={Styles.customersTable__body_checkbox}>
        <CheckboxLoader />
      </td>
      <td className={Styles.customersTable__body_name}>
        <ItemLoader />
      </td>
      <td className={Styles.customersTable__body_id}>
        <ItemLoader />
      </td>
      <td className={Styles.customersTable__body_phone}>
        <ItemLoader />
      </td>
      <td className={Styles.customersTable__body_email}>
        <ItemLoader />
      </td>
      <td className={Styles.customersTable__body_block}>
        <ItemLoader />
      </td>
      <td className={Styles.customersTable__body_role}>
        <ItemLoader />
      </td>
      <td className={Styles.customersTable__body_created}>
        <ItemLoader />
      </td>
    </tr>
  );
};

export default CustomerRowLoader;
