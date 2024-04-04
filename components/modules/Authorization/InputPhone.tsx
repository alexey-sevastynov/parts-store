import Styles from '@/styles/modules/authorization/index.module.scss';

import { useLang } from '@/hooks/useLang';
import { IAuthInput } from '@/types/authorization';
import { phoneValidationRules } from '@/utils/authorization';

const InputPhone = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.phone}>
      <label className={Styles.phone__label} htmlFor='phone'>
        {translations[lang].authorization.phone_number}
      </label>
      <input
        className={Styles.phone__input}
        type='tel'
        {...register(
          'phone',
          phoneValidationRules(
            translations[lang].validation.invalid_phone,
            translations[lang].validation.invalid_value
          )
        )}
      />

      {errors.phone && (
        <span className={Styles.phone__error}>{errors.phone?.message}</span>
      )}
    </div>
  );
};

export default InputPhone;
