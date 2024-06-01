import Styles from '@/styles/modules/dashboard/index.module.scss';

import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import { useLang } from '@/hooks/useLang';

import { IProductInputs } from '@/types/goods';
import { codeProductValidationRules } from '@/utils/goods';

const InputCodeProduct = ({
  register,
  errors,
}: {
  register: UseFormRegister<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.inputCodeProduct}>
      <label className={Styles.inputCodeProduct__label} htmlFor='brand'>
        {translations[lang].dashboard_page.code_product}
      </label>

      <input
        className={Styles.inputCodeProduct__input}
        id='code'
        type='text'
        placeholder={translations[lang].dashboard_page.input_code_product}
        {...register(
          'sku',
          codeProductValidationRules(
            translations[lang].validation.required_code
          )
        )}
      />

      <div className={Styles.selectBrand__error}>
        {errors.sku && (
          <span className='input-error'>{errors.sku.message}</span>
        )}
      </div>
    </div>
  );
};

export default InputCodeProduct;
