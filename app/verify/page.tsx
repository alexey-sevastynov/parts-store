import { verifyWithCredentials } from '@/actions/authActions';
import VerifyPage from '@/components/templates/VerifyPage/VerifyPage';

const Verify = async ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  await verifyWithCredentials(token);

  return <VerifyPage />;
};

export default Verify;
