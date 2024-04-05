import Styles from '@/styles/modules/authorization/index.module.scss';

import { SubmitHandler, useForm } from 'react-hook-form';

import { IoMdClose } from 'react-icons/io';
import { COLORS } from '@/constants/colors';

import { useLang } from '@/hooks/useLang';
import { IInputs } from '@/types/authorization';

import { Button } from '@/components/elements/Button';

import {
  closeDropDownAuth,
  openWindowSignUp,
} from '@/context/features/modals/modals';

import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import ButtonSocialFusion from './ButtonSocialFusion';
import { useAppDispatch } from '@/context/hooks';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { lang, translations } = useLang();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<IInputs>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    console.log(data);
  };
  return (
    <form className={Styles.signIn} onSubmit={handleSubmit(onSubmit)}>
      {/* _____header title and close */}
      <div className={Styles.signIn__head}>
        <h2 className={Styles.signIn__head_title}>
          {translations[lang].authorization.sign_in}
        </h2>
        <button
          className={Styles.signIn__head_close}
          type='button'
          onClick={() => dispatch(closeDropDownAuth())}
        >
          <IoMdClose color={COLORS.blackIcon} />
        </button>
      </div>
      {/* _____main colum left, middle line and colum right */}
      <div className={Styles.signIn__main}>
        {/* _____colum left */}
        <div className={Styles.signIn__main_left}>
          <InputEmail register={register} errors={errors} />
          <InputPassword register={register} errors={errors} />

          <div className={Styles.signIn__main_left_footer}>
            <Button type='submit'>
              {translations[lang].authorization.sign_in}
            </Button>

            <button
              className='btn-md-transparent'
              type='button'
              onClick={() => dispatch(openWindowSignUp())}
            >
              {translations[lang].authorization.sign_up}
            </button>
          </div>
        </div>

        {/* _____middle line */}
        <div className={Styles.signIn__main_middle}>
          <div className={Styles.signIn__main_middle_line} />
          <p className={Styles.signIn__main_middle_text}>
            {translations[lang].authorization.or}
          </p>
          <div className={Styles.signIn__main_middle_line} />
        </div>

        {/* _____colum right */}
        <div className={Styles.signIn__main_right}>
          <h4 className={Styles.signIn__main_right_title}>
            {translations[lang].authorization.log_in_as_user}
          </h4>
          <ButtonSocialFusion type='button' nameIcon='google'>
            Google
          </ButtonSocialFusion>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
