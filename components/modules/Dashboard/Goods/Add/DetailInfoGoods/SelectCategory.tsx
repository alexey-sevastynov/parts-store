import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Select from 'react-select';
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form';
import useSWR from 'swr';

import { useLang } from '@/hooks/useLang';

import { IProductInputs, OptionCountryType } from '@/types/goods';

import { COLORS } from '@/constants/colors';
import { customSelectStyles } from '@/constants/react-select';
import {
  brandValidationRules,
  categoryValidationRules,
  getCountries,
} from '@/utils/goods';
import { getSubSubCategories } from '@/actions/categoryActions';

const SelectCategory = ({
  control,
  errors,
}: {
  control: Control<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
}) => {
  const { lang, translations } = useLang();

  const { data, error, isLoading } = useSWR(
    'subsubcategories',
    getSubSubCategories,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const options = data?.subSubCategories
    ?.map(
      (subSubCategory: { name: { ua: string; en: string; ru: string } }) => ({
        value: {
          ua: subSubCategory.name.ua,
          en: subSubCategory.name.en,
          ru: subSubCategory.name.ru,
        },
        label: subSubCategory.name[lang],
      })
    )
    ?.sort((a: OptionCountryType, b: OptionCountryType) =>
      a.label.localeCompare(b.label)
    );

  return (
    <div className={Styles.selectCategory}>
      <label className={Styles.selectCategory__label} htmlFor='category'>
        {translations[lang].dashboard_page.select_category}
      </label>

      <Controller
        name='category'
        control={control}
        rules={categoryValidationRules(
          translations[lang].validation.required_category
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
            id='category'
            placeholder={translations[lang].dashboard_page.select_category}
          />
        )}
      />

      <div className={Styles.selectCategory__error}>
        {errors.category && (
          <span className='input-error'>{errors.category.message}</span>
        )}
      </div>
    </div>
  );
};

export default SelectCategory;
