import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Select from 'react-select';
import { Control, Controller, useWatch } from 'react-hook-form';

import { useLang } from '@/hooks/useLang';

import { COLORS } from '@/constants/colors';
import { customSelectStyles } from '@/constants/react-select';

import { IProductInputs, OptionCharacteristicValueType } from '@/types/goods';
import { ICharacteristics } from '@/types/characteristic';

const SelectValueCharacteristic = ({
  control,
  characteristics,
}: {
  control: Control<IProductInputs>;
  characteristics: ICharacteristics[];
}) => {
  const { lang, translations } = useLang();
  const selectedCharacteristicName: OptionCharacteristicValueType = useWatch({
    control,
    name: 'characteristics.name',
  });

  const selectedCharacteristicId = selectedCharacteristicName?.value._id;

  const selectedCharacteristic = characteristics?.find(
    (characteristic) => characteristic._id === selectedCharacteristicId
  );

  const options = selectedCharacteristic?.values.map((value) => ({
    value: {
      en: value.en,
      ru: value.ru,
      ua: value.ua,
      _id: value._id,
    },
    label: value[lang],
  }));

  return (
    <div className={Styles.selectValueCharacteristic}>
      <label
        htmlFor='value characteristic'
        className={Styles.selectValueCharacteristic__label}
      >
        {translations[lang].dashboard_page.select_description_characteristic}
      </label>

      <Controller
        name='characteristics.value'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 7,
              colors: {
                ...theme.colors,
                primary25: COLORS.orange,
                primary: COLORS.orange,
              },
            })}
            styles={customSelectStyles}
            id='value characteristic'
            placeholder={
              translations[lang].dashboard_page
                .select_description_characteristic
            }
          />
        )}
      />
    </div>
  );
};

export default SelectValueCharacteristic;
