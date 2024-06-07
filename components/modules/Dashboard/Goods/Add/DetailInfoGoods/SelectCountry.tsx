import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Select from 'react-select';
import { Control, Controller } from 'react-hook-form';
import useSWR from 'swr';

import { useLang } from '@/hooks/useLang';

import { IProductInputs, OptionCountryType } from '@/types/goods';

import { COLORS } from '@/constants/colors';
import { customSelectStyles } from '@/constants/react-select';
import { getCountries } from '@/utils/goods';

const SelectCountry = ({ control }: { control: Control<IProductInputs> }) => {
  const { lang, translations } = useLang();

  const { data, error, isLoading } = useSWR('countries', getCountries, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const options = data
    ?.map((country: { name: { ua: string; en: string; ru: string } }) => ({
      value: { ua: country.name.ua, en: country.name.en, ru: country.name.ru },
      label: country.name[lang],
    }))
    ?.sort((a: OptionCountryType, b: OptionCountryType) =>
      a.label.localeCompare(b.label)
    );

  return (
    <div className={Styles.selectCountry}>
      <label className={Styles.selectCountry__label} htmlFor='country'>
        {translations[lang].dashboard_page.select_country_factory}
      </label>

      <Controller
        name='country'
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
            id='country'
            placeholder={
              translations[lang].dashboard_page.select_country_factory
            }
          />
        )}
      />
    </div>
  );
};

export default SelectCountry;
