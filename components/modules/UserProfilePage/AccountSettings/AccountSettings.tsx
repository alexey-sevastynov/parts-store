'use client';
import Styles from '@/styles/modules/user-profile-page/index.module.scss';

import { useAppDispatch } from '@/context/hooks';

import { SlSettings } from 'react-icons/sl';
import { SIZE_ICON } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import {
  openPopupWindowChangePassword,
  openPopupWindowDeleteUser,
} from '@/context/features/modals/modals';
import { addOverflowHiddenToBody } from '@/utils/common';

import AccordionCard from '../AccordionCard';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/authActions';

const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const session = useSession();

  const { lang, translations } = useLang();

  const openWindowChangePassword = () => {
    dispatch(openPopupWindowChangePassword());
    addOverflowHiddenToBody();
  };

  const exit = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <AccordionCard
      iconReactIcons={
        <SlSettings
          className={Styles.accordionCard__header_icon}
          size={SIZE_ICON}
        />
      }
      title={translations[lang].user_page.account_settings}
    >
      <div className={Styles.accountSettings__accordion_content}>
        <div className={Styles.accountSettings__accordion_content_btns}>
          {session.data?.user.provider === 'credentials' && (
            <button type='button' onClick={openWindowChangePassword}>
              {translations[lang].user_page.change_password}
            </button>
          )}

          <button onClick={() => dispatch(openPopupWindowDeleteUser())}>
            {translations[lang].user_page.delete_account}
          </button>
        </div>

        <div className={Styles.accountSettings__accordion_content_btns}>
          <button onClick={exit}>
            {translations[lang].authorization.sign_out}
          </button>
        </div>
      </div>
    </AccordionCard>
  );
};

export default AccountSettings;
