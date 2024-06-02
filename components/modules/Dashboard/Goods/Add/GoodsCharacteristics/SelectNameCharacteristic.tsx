import Styles from '@/styles/modules/dashboard/index.module.scss';

import Select from 'react-select';
import { Control, Controller } from 'react-hook-form';

import { useLang } from '@/hooks/useLang';
import { IProductInputs } from '@/types/goods';

import { COLORS } from '@/constants/colors';
import { customSelectStyles } from '@/constants/react-select';

import { ICharacteristics } from '@/types/characteristic';

const SelectNameCharacteristic = ({
  control,
  characteristics,
}: {
  control: Control<IProductInputs>;
  characteristics: ICharacteristics[];
}) => {
  const { lang, translations } = useLang();

  const options = characteristics
    ?.map((characteristic) => ({
      value: {
        en: characteristic.name.en,
        ru: characteristic.name.ru,
        ua: characteristic.name.ua,
        _id: characteristic._id,
      },
      label: characteristic.name[lang],
    }))
    ?.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className={Styles.selectNameCharacteristic}>
      <label
        className={Styles.selectNameCharacteristic__label}
        htmlFor='name characteristic'
      >
        {translations[lang].dashboard_page.select_name_characteristic}
      </label>

      <Controller
        name='characteristics.name'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            theme={(theme) => ({
              ...theme,
              dropdownIndicator: COLORS.grey,
              borderRadius: 7,
              colors: {
                ...theme.colors,

                primary25: COLORS.orange,
                primary: COLORS.orange,
              },
            })}
            styles={customSelectStyles}
            id='name characteristic'
            placeholder={
              translations[lang].dashboard_page.select_name_characteristic
            }
          />
        )}
      />
    </div>
  );
};

export default SelectNameCharacteristic;
