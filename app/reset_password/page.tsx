import ResetPasswordPage from '@/components/templates/ResetPasswordPage/ResetPasswordPage';

const ResetPassword = (props: any) => {
  return <ResetPasswordPage token={props.searchParams.token} />;
};

export default ResetPassword;
