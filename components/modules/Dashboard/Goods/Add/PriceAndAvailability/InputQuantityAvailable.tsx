import Styles from '@/styles/modules/dashboard/index.module.scss';

import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import { useLang } from '@/hooks/useLang';

import { IProductInputs } from '@/types/goods';
import { quantityAvailableValidationRules } from '@/utils/goods';

const InputQuantityAvailable = ({
  register,
  errors,
}: {
  register: UseFormRegister<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.inputQuantityAvailable}>
      <label
        className={Styles.inputQuantityAvailable__label}
        htmlFor='available'
      >
        {translations[lang].dashboard_page.number_available}
      </label>

      <input
        className={Styles.inputQuantityAvailable__input}
        id='available'
        type='number'
        placeholder={translations[lang].dashboard_page.input_number_available}
        {...register(
          'quantityAvailable',
          quantityAvailableValidationRules(
            translations[lang].dashboard_page.required_quantity_available
          )
        )}
      />

      <div className={Styles.inputPrice__error}>
        {errors.sku && (
          <span className='input-error'>
            {errors.quantityAvailable?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputQuantityAvailable;
