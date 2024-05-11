import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';
import Link from 'next/link';

import { COLORS } from '@/constants/colors';
import { AllowedLangs } from '@/constants/lang';
import { ROUTES } from '@/constants/common';

import { ICharacteristics } from '@/types/characteristic';

interface CharacteristicRowProps {
  characteristic: ICharacteristics;
  isChecked: boolean;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  lang: AllowedLangs;
}

const CharacteristicRow: React.FC<CharacteristicRowProps> = ({
  characteristic,
  isChecked,
  handleCheckboxChange,
  lang,
}) => {
  const { _id, values, name } = characteristic;

  return (
    <tr
      key={_id}
      className={Styles.characteristicTable__body}
      style={isChecked ? { backgroundColor: COLORS.grey } : {}}
    >
      {/* checkbox */}
      <td
        className={`${Styles.characteristicTable__body_checkbox} ${
          isChecked && Styles.select
        }`}
      >
        <input
          type='checkbox'
          name={_id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>

      {/* name characteristic */}
      <td className={Styles.characteristicTable__head_name_characteristic}>
        <Link href={ROUTES.VIEW_CHARACTERISTIC_BY_ID(_id || 'error')}>
          {name[lang]}
        </Link>
      </td>

      {/* value characteristic */}
      <td className={Styles.characteristicTable__head_list_characteristics}>
        {values.map((item) => {
          // Check if there is a translation for the current language
          if (item.hasOwnProperty(lang)) {
            return (
              <p
                className={
                  Styles.characteristicTable__head_list_characteristics_item
                }
                key={item._id}
              >
                {item[lang] + ', '}
              </p>
            );
          }
          // If there is no translation for the current language, return null
          return null;
        })}
      </td>
    </tr>
  );
};

export default CharacteristicRow;
