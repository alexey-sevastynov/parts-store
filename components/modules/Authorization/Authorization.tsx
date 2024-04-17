import Styles from '@/styles/modules/authorization/index.module.scss';

import { useAppSelector } from '@/context/hooks';

import SignUp from './SignUp';
import SignIn from './SignIn';
import RemindPassword from './RemindPassword';

const Authorization = () => {
  const isActiveSignIn = useAppSelector(
    (items) => items.modals.isOpenDropDownAuth.isActiveSignIn
  );

  const isActiveSignUp = useAppSelector(
    (items) => items.modals.isOpenDropDownAuth.isActiveSignUp
  );

  const isActiveRemindPassword = useAppSelector(
    (items) => items.modals.isOpenDropDownAuth.isActiveRemindPassword
  );

  return (
    <section className={Styles.authorization}>
      {isActiveSignUp && <SignUp />}
      {isActiveSignIn && <SignIn />}
      {isActiveRemindPassword && <RemindPassword />}
    </section>
  );
};

export default Authorization;
