import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import { IProductInputs } from '@/types/goods';

import { useLang } from '@/hooks/useLang';

import { nameValidationRules } from '@/utils/goods';

import { AllowedLangs, AllowedLangsArray } from '@/constants/lang';

const InputNameProduct = ({
  register,
  errors,
}: {
  register: UseFormRegister<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
}) => {
  const { lang: language, translations } = useLang();

  const renderInput = (lang: AllowedLangs) => {
    const langKey = lang as AllowedLangs;
    return (
      <div key={lang} className={Styles.inputsNameProduct__inputs_item}>
        <div className={Styles.inputsNameProduct__inputs_item_input}>
          <label>{lang.toUpperCase()}</label>
          <input
            {...register(
              `name.${langKey}`,
              nameValidationRules(
                translations[langKey].validation.min_4,
                translations[langKey].validation.max_80,
                translations[langKey].validation.required_name
              )
            )}
            placeholder={
              translations[langKey].dashboard_page.input_name_product
            }
          />
        </div>
        <div className={Styles.inputsNameProduct__inputs_item_error}>
          {errors.name?.[langKey] && (
            <span className='input-error'>
              {errors.name?.[langKey]?.message}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={Styles.inputsNameProduct}>
      <label className={Styles.inputsNameProduct__label}>
        {translations[language].dashboard_page.name_product}
      </label>
      <div className={Styles.inputsNameProduct__inputs}>
        {AllowedLangsArray.map((lang) => renderInput(lang))}
      </div>
    </div>
  );
};

export default InputNameProduct;
