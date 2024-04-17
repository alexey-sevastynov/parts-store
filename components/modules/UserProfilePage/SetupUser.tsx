'use client';
import Styles from '@/styles/modules/user-profile-page/index.module.scss';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import PersonalData from './PersonalData/PersonalData';
import AccountSettings from './AccountSettings/AccountSettings';

const SetupUser = () => {
  const { lang, translations } = useLang();
  return (
    <section className={Styles.setupUser}>
      <Title className={Styles.setupUser__title}>
        {translations[lang].user_page.setup_title}
      </Title>

      <div className={Styles.setupUser__list}>
        <PersonalData />
        <AccountSettings />
      </div>
    </section>
  );
};

export default SetupUser;
