'use client';
import Styles from '@/styles/elements/index.module.scss';

import Image from 'next/image';

import { IUserCardProps } from '@/types/elements';
import { useSession } from 'next-auth/react';
import { LuUser2 } from 'react-icons/lu';
import { SIZE_ICON } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import { useAppDispatch } from '@/context/hooks';
import {
  closePopupAsidePanel,
  openWindowSignIn,
  openWindowSignUp,
} from '@/context/features/modals/modals';
import { removeOverflowHiddenFromBody } from '@/utils/common';

const UserCard = ({
  firstName,
  lastName,
  email,
  photo,
  isActive,
  theme = 'dark',
  isOnlyPhoto,
}: IUserCardProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSession();
  const { lang, translations } = useLang();

  const firstLetter = firstName[0].toUpperCase();

  const fullName = firstName + ' ' + lastName;

  const photoCard = photo ? (
    <Image
      className={Styles.userCard__photo}
      src={photo}
      alt={'avatar'}
      width={40}
      height={40}
    />
  ) : (
    <div
      className={`${Styles.userCard__photo} ${Styles.userCard__photo_custom}`}
    >
      {firstLetter}
    </div>
  );

  if (isOnlyPhoto) {
    return <div className={Styles.userCard}>{photoCard}</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className={Styles.userCard}>
        <div className={Styles.userCard__photo_unauthenticated}>
          <LuUser2 size={SIZE_ICON} />
        </div>

        <div className={Styles.userCard__description}>
          <div className={Styles.userCard__description_head}>
            <button
              className={`${Styles.userCard__description_head_signIn} ${theme === 'light' ? Styles.userCard__description_head_signIn_light : ''}`}
              type='button'
              onClick={() => {
                dispatch(closePopupAsidePanel());
                dispatch(openWindowSignIn());
                removeOverflowHiddenFromBody();
              }}
            >
              {translations[lang].authorization.sign_in}
            </button>

            <span className={Styles.userCard__description_head_divider} />
            <button
              className={`${Styles.userCard__description_head_signUp} ${theme === 'light' ? Styles.userCard__description_head_signUp_light : ''}`}
              type='button'
              onClick={() => {
                dispatch(closePopupAsidePanel());
                dispatch(openWindowSignUp());
                removeOverflowHiddenFromBody();
              }}
            >
              {translations[lang].authorization.sign_up}
            </button>
          </div>
          <p
            className={`${Styles.userCard__description_text} ${theme === 'light' ? Styles.userCard__description_text_light : ''}`}
          >
            {translations[lang].authorization.please_log_in_for_extra_features}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.userCard}>
      {photoCard}

      <div className={Styles.userCard__description}>
        <p
          className={`${Styles.userCard__description_name} ${isActive ? Styles.userCard__description_name_active : ''} ${theme === 'light' ? Styles.userCard__description_name_light : ''}`}
          title={fullName}
        >
          {fullName}
        </p>
        <p
          className={`${Styles.userCard__description_email} ${theme === 'light' ? Styles.userCard__description_email_light : ''}`}
          title={email}
        >
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
