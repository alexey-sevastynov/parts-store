import { verifyWithCredentials } from '@/actions/authActions';
import VerifyPage from '@/components/templates/VerifyPage/VerifyPage';

const Verify = async ({
  searchParams: { token },
}: {
  params: any;
  searchParams: { token: string };
}) => {
  const res = await verifyWithCredentials(token);

  return <VerifyPage />;
};

export default Verify;
