import Styles from '@/styles/modules/authorization/index.module.scss';

import { useAppSelector } from '@/context/hooks';

import SignUp from './SignUp';
import SignIn from './SignIn';

const Authorization = () => {
  const isActiveSignIn = useAppSelector(
    (items) => items.modals.isOpenDropDownAuth.isActiveSignIn
  );

  const isActiveSignUp = useAppSelector(
    (items) => items.modals.isOpenDropDownAuth.isActiveSignUp
  );

  return (
    <section className={Styles.authorization}>
      {isActiveSignUp && <SignUp />}
      {isActiveSignIn && <SignIn />}
    </section>
  );
};

export default Authorization;
