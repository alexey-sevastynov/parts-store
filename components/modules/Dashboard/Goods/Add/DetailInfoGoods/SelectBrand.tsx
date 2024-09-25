import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Select from 'react-select';
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form';
import { useLang } from '@/hooks/useLang';
import { brandValidationRules } from '@/utils/goods';
import { IBrand } from '@/types/brand';
import { IProductInputs, OptionLabelType } from '@/types/goods';
import { COLORS } from '@/constants/colors';
import { customSelectStyles } from '@/constants/react-select';

const SelectBrand = ({
  errors,
  brandsList,
  control,
}: {
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
  brandsList: IBrand[];
  control: Control<IProductInputs>;
}) => {
  const { lang, translations } = useLang();

  const options = brandsList
    .map((brand: IBrand) => ({
      value: brand._id,
      label: brand.name,
    }))
    ?.sort((a: OptionLabelType, b: OptionLabelType) =>
      a.label.localeCompare(b.label)
    );

  return (
    <div className={Styles.selectBrand}>
      <label className={Styles.selectBrand__label} htmlFor='brand'>
        {translations[lang].dashboard_page.select_brand}
      </label>

      <Controller
        name='brand'
        control={control}
        rules={brandValidationRules(
          translations[lang].validation.required_brand
        )}
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
            id='brand'
            placeholder={translations[lang].dashboard_page.select_brand}
          />
        )}
      />

      <div className={Styles.selectBrand__error}>
        {errors.brand && (
          <span className='input-error'>{errors.brand.message}</span>
        )}
      </div>
    </div>
  );
};

export default SelectBrand;
