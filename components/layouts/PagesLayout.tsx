'use client';

import { useAppSelector } from '@/context/hooks';
import Layout from './Layout';
import AdminLayout from './AdminLayout';

import { usePathname } from 'next/navigation';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isDashboardPage = pathname === '/dashboard';

  const isOpenDropDownLang = useAppSelector(
    (state) => state.modals.isOpenDropDownLang
  );
  const isOpenDropDownAuth = useAppSelector(
    (state) => state.modals.isOpenDropDownAuth.isOpen
  );
  const isOpenChangePassword = useAppSelector(
    (state) => state.modals.isOpenChangePassword
  );

  const isOpenDeleteUser = useAppSelector(
    (props) => props.modals.isOpenDeleteUser
  );

  return (
    <>
      {!isDashboardPage && <Layout>{children}</Layout>}

      {isDashboardPage && <AdminLayout>{children}</AdminLayout>}

      {/* background, when the language drop-down window is open */}
      <div
        className={`lang-popup-overlay ${isOpenDropDownLang ? 'overlay-active' : ''}`}
      />

      {/* background, when the authorization drop-down window is open */}
      <div
        className={`authorization-popup-overlay ${isOpenDropDownAuth ? 'overlay-active' : ''}`}
      />

      {/* background, when the window popup Change Password is open */}
      <div
        className={`popup-window-overlay ${isOpenChangePassword ? 'overlay-active' : ''}`}
      />

      {/* background, when the window popup Delete User is open */}
      <div
        className={`popup-window-overlay ${isOpenDeleteUser ? 'overlay-active' : ''}`}
      />
    </>
  );
};

export default PagesLayout;
