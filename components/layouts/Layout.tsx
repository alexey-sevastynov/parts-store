'use client';

import Header from '../modules/Header/Header';

import { useAppDispatch, useAppSelector } from '@/context/hooks';

import PopupWindow from '../elements/PopupWindow';
import {
  closePopupWindowChangePassword,
  closePopupWindowDeleteUser,
} from '@/context/features/modals/modals';
import { useLang } from '@/hooks/useLang';
import PasswordChange from '../modules/UserProfilePage/AccountSettings/PasswordChange/PasswordChange';
import DeleteUser from '../modules/UserProfilePage/AccountSettings/DeleteUser';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const { lang, translations } = useLang();

  const isOpenChangePassword = useAppSelector(
    (props) => props.modals.isOpenChangePassword
  );
  const isOpenDeleteUser = useAppSelector(
    (props) => props.modals.isOpenDeleteUser
  );

  return (
    <>
      <div className='header-wrapper'>
        <div className='container'>
          <Header />
          {children}
        </div>
      </div>

      {/* Window popup the change password */}
      {isOpenChangePassword && (
        <PopupWindow
          title={translations[lang].authorization.password_change}
          closePopupWindow={() => dispatch(closePopupWindowChangePassword())}
        >
          <PasswordChange />
        </PopupWindow>
      )}

      {/* Window popup the delete user */}
      {isOpenDeleteUser && (
        <PopupWindow
          title={translations[lang].user_page.delete_account}
          closePopupWindow={() => dispatch(closePopupWindowDeleteUser())}
        >
          <DeleteUser />
        </PopupWindow>
      )}

      {/* Footer here */}
    </>
  );
};

export default Layout;
