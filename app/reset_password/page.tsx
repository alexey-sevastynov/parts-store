'use server';

import ResetPasswordPage from '@/components/templates/ResetPasswordPage/ResetPasswordPage';
import { ResetPasswordProps } from '@/types/authorization';

const ResetPassword = async (props: ResetPasswordProps) => {
  return <ResetPasswordPage token={props.searchParams.token} />;
};

export default ResetPassword;
