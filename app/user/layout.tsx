import Styles from '@/styles/layouts/user/index.module.scss';

import SidebarNavigation from '@/components/modules/SideBarNavigation/SidebarNavigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={Styles.userLayout}>
      <SidebarNavigation />
      {children}
    </div>
  );
}
