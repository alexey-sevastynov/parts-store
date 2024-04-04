import Styles from '@/styles/modules/authorization/index.module.scss';

import SignUp from './SignUp';
import SignIn from './SignIn';

const Authorization = () => {
  return (
    <section className={Styles.authorization}>
      {/* <SignUp /> */}
      <SignIn />
    </section>
  );
};

export default Authorization;
