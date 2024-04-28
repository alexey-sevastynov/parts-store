import Styles from '@/styles/layouts/admin-layout/index.module.scss';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={Styles.adminLayout}>{children}</div>;
};

export default AdminLayout;
