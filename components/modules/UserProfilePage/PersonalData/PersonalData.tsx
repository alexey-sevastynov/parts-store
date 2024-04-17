import Styles from '@/styles/modules/user-profile-page/index.module.scss';

import React from 'react';

import { useSession } from 'next-auth/react';
import { useLang } from '@/hooks/useLang';
import { extractLastFiveCharacters } from '@/utils/common';

import { HiOutlineUserCircle } from 'react-icons/hi2';
import { SIZE_ICON } from '@/constants/common';

import AccordionCard from '../AccordionCard';
import { Button } from '@/components/elements/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IInputs } from '@/types/authorization';

import InputEditFirstName from './InputEditFirstName';
import InputEditLastName from './InputEditLastName';
import InputEditPhone from './InputEditPhone';

import { updateUser } from '@/actions/authActions';
import { Oval } from 'react-loader-spinner';
import { COLORS } from '@/constants/colors';

const PersonalData = () => {
  const { data, status, update } = useSession();

  const { lang, translations } = useLang();

  const [isActiveEdit, setIsActiveEdit] = React.useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = React.useState<boolean>(false);
  const [prevData, setPrevData] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const email = data?.user?.email || 'Unknown email';
  const firstName = data?.user?.firstName || 'Unknown';
  const lastName = data?.user?.lastName || 'user';
  const clientCode = extractLastFiveCharacters(data?.user._id || '00000');
  const phone = data?.user.phone || '-';

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IInputs>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  React.useEffect(() => {
    if (data?.user) {
      const { firstName, lastName, phone } = data.user;
      setValue('firstName', firstName || 'Unknown');
      setValue('lastName', lastName || 'user');
      setValue('phone', phone || '+38');

      setPrevData({ firstName, lastName, phone: phone || '+38' });
    }
  }, [data?.user, setValue]);

  React.useEffect(() => {
    if (
      watch('firstName') === prevData.firstName &&
      watch('lastName') === prevData.lastName &&
      watch('phone') === prevData.phone
    ) {
      setIsValueChanged(true);
    } else {
      setIsValueChanged(false);
    }
  }, [watch()]);

  const handleEdit = () => {
    setIsActiveEdit(true);
  };

  const handleCancelEdit = () => {
    setIsActiveEdit(false);
    setIsValueChanged(false);
    setValue('firstName', firstName || 'Unknown');
    setValue('lastName', lastName || 'user');
    setValue('phone', phone === '-' ? '+38' : phone);
  };

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    const { firstName, lastName, phone } = data;
    const res = await updateUser({ firstName, lastName, phone });

    console.log(update);

    if (update) update({ firstName, lastName, phone });

    if (res.status === 'success') {
      setIsActiveEdit(false);
    }
  };

  return (
    <AccordionCard
      iconReactIcons={
        <HiOutlineUserCircle
          className={Styles.accordionCard__header_icon}
          size={SIZE_ICON}
        />
      }
      title={translations[lang].user_page.personal_data}
    >
      <form
        className={Styles.personalData__accordion_content}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ul className={Styles.personalData__accordion_content_list}>
          {/* ____________first name */}
          <li className={Styles.personalData__accordion_content_list_item}>
            <p>{translations[lang].authorization.first_name}</p>

            {isActiveEdit ? (
              <InputEditFirstName register={register} errors={errors} />
            ) : (
              <p>{firstName}</p>
            )}
          </li>

          {/* ____________last name */}
          <li className={Styles.personalData__accordion_content_list_item}>
            <p>{translations[lang].authorization.last_name}</p>
            {isActiveEdit ? (
              <InputEditLastName register={register} errors={errors} />
            ) : (
              <p>{lastName}</p>
            )}
          </li>

          {/* ____________client code */}
          <li className={Styles.personalData__accordion_content_list_item}>
            <p>{translations[lang].user_page.client_code}</p>
            <p>{clientCode}</p>
          </li>

          {/* ____________email */}
          <li className={Styles.personalData__accordion_content_list_item}>
            <p>{translations[lang].authorization.email}</p>
            <p>{email}</p>
          </li>

          {/* ____________mobile */}
          <li className={Styles.personalData__accordion_content_list_item}>
            <p>{translations[lang].authorization.phone_number}</p>
            {isActiveEdit ? (
              <InputEditPhone register={register} errors={errors} />
            ) : (
              <p>{phone}</p>
            )}
          </li>
        </ul>

        {isActiveEdit ? (
          // _______ if edit buttons
          <div className={Styles.personalData__accordion_btns}>
            <Button
              className={Styles.personalData__accordion_btn}
              disabled={isValueChanged === true}
              type='submit'
            >
              {isSubmitting ? (
                <Oval
                  visible={true}
                  height={SIZE_ICON}
                  width={SIZE_ICON}
                  color={COLORS.whiteFont}
                  secondaryColor={COLORS.whiteFont}
                  ariaLabel='oval-loading'
                />
              ) : (
                translations[lang].common.save
              )}
            </Button>
            <Button
              className={Styles.personalData__accordion_btn}
              onClick={handleCancelEdit}
              type='button'
            >
              {translations[lang].common.cancel}
            </Button>
          </div>
        ) : (
          // _______ if NOT edit button
          <Button
            className={Styles.personalData__accordion_btn}
            onClick={handleEdit}
          >
            {translations[lang].common.edit}
          </Button>
        )}
      </form>
    </AccordionCard>
  );
};

export default PersonalData;
