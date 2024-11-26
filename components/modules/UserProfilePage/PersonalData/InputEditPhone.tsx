import Styles from '@/styles/modules/user-profile-page/index.module.scss';
import { useLang } from '@/hooks/useLang';
import { IAuthInput } from '@/types/authorization';
import { phoneValidationRules } from '@/utils/authorization';

const InputEditPhone = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.inputEditPhone}>
      <label
        className={Styles.inputEditPhone__label}
        htmlFor='first name'
        style={{ display: 'none' }}
      >
        {translations[lang].authorization.first_name}
      </label>
      <input
        className={Styles.inputEditPhone__input}
        type='tel'
        id='phone'
        {...register(
          'phone',
          phoneValidationRules(
            translations[lang].validation.invalid_phone,
            translations[lang].validation.invalid_value
          )
        )}
      />

      {errors.phone && (
        <span className={Styles.inputEditPhone__error}>
          {errors.phone?.message}
        </span>
      )}
    </div>
  );
};

export default InputEditPhone;
