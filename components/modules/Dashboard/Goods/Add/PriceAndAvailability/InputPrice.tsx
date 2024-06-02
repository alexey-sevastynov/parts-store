import Styles from '@/styles/modules/dashboard/index.module.scss';

import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import { useLang } from '@/hooks/useLang';

import { IProductInputs } from '@/types/goods';
import { priceProductValidationRules } from '@/utils/goods';

const InputPrice = ({
  register,
  errors,
}: {
  register: UseFormRegister<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.inputPrice}>
      <label className={Styles.inputPrice__label} htmlFor='price'>
        {translations[lang].dashboard_page.price_product}
      </label>

      <input
        className={Styles.inputPrice__input}
        id='price'
        type='number'
        placeholder={translations[lang].dashboard_page.input_price_product}
        {...register(
          'price',
          priceProductValidationRules(
            translations[lang].dashboard_page.required_price
          )
        )}
      />

      <div className={Styles.inputPrice__error}>
        {errors.sku && (
          <span className='input-error'>{errors.price?.message}</span>
        )}
      </div>
    </div>
  );
};

export default InputPrice;
