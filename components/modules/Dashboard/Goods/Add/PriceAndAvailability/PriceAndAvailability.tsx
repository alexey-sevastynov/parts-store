import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import Title from '@/components/elements/Title';
import { useLang } from '@/hooks/useLang';
import { IProductInputs } from '@/types/goods';

import InputSalePrice from './InputSalePrice';
import InputPrice from './InputPrice';
import InputQuantityAvailable from './InputQuantityAvailable';

const PriceAndAvailability = ({
  register,
  errors,
}: {
  register: UseFormRegister<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.priceAndAvailability}>
      <Title
        className={Styles.priceAndAvailability__title}
        size='sm'
        weight='semiBold'
      >
        {translations[lang].dashboard_page.price_and_available}
      </Title>

      <div className={Styles.priceAndAvailability__inputs}>
        <InputPrice register={register} errors={errors} />
        <InputSalePrice register={register} errors={errors} />
        <InputQuantityAvailable register={register} errors={errors} />
      </div>
    </div>
  );
};

export default PriceAndAvailability;
