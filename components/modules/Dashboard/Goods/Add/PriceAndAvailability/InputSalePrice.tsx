import Styles from '@/styles/modules/dashboard/index.module.scss';

import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import { useLang } from '@/hooks/useLang';

import { IProductInputs } from '@/types/goods';

const InputSalePrice = ({
  register,
  errors,
}: {
  register: UseFormRegister<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.inputSalePrice}>
      <label className={Styles.inputSalePrice__label} htmlFor='salePrice'>
        {translations[lang].dashboard_page.sale_product}
      </label>

      <input
        className={Styles.inputSalePrice__input}
        id='salePrice'
        type='number'
        placeholder={translations[lang].dashboard_page.input_sale_product}
        {...register('salePrice')}
      />
    </div>
  );
};

export default InputSalePrice;
