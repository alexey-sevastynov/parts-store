import Styles from '@/styles/modules/dashboard/index.module.scss';

import { CheckboxLoader } from '../TableAdmin/CheckboxLoader';
import ItemLoader from '../TableAdmin/ItemLoader';

const CharacteristicRowLoader = () => {
  return (
    <tr className={Styles.characteristicTable__body}>
      <td className={Styles.characteristicTable__body_checkbox}>
        <CheckboxLoader />
      </td>
      <td className={Styles.characteristicTable__head_name_characteristic}>
        <ItemLoader />
      </td>
      <td className={Styles.characteristicTable__head_list_characteristics}>
        <ItemLoader />
      </td>
    </tr>
  );
};

export default CharacteristicRowLoader;
