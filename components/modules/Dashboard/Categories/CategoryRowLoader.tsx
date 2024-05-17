import Styles from '@/styles/modules/dashboard/index.module.scss';

import { CheckboxLoader } from '../TableAdmin/CheckboxLoader';
import ItemLoader from '../TableAdmin/ItemLoader';

const CategoryRowLoader = () => {
  return (
    <tr className={Styles.categoriesTable__body}>
      <td className={Styles.categoriesTable__body_checkbox}>
        <CheckboxLoader />
      </td>
      <td className={Styles.categoriesTable__head_name_characteristic}>
        <ItemLoader />
      </td>
      <td className={Styles.categoriesTable__head_list_characteristics}>
        <ItemLoader />
      </td>
    </tr>
  );
};

export default CategoryRowLoader;
