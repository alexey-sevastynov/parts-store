import LogotypeSmall from '@/components/elements/LogotypeSmall';
import UserCard from '@/components/elements/UserCard';

import { COLORS } from '@/constants/colors';
import { basePropsForMotionAsidePanel } from '@/constants/motion';
import { closePopupAsidePanel } from '@/context/features/modals/modals';
import { useAppDispatch } from '@/context/hooks';
import Styles from '@/styles/modules/aside-panel/index.module.scss';
import { removeOverflowHiddenFromBody } from '@/utils/common';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { IoMdClose } from 'react-icons/io';
import { useLang } from '@/hooks/useLang';

import ListLinks from './ListLinks';
import LanguagePanel from './LanguagePanel';
import ListInfoAboutCompany from '@/components/elements/ListInfoAboutCompany';
import ListInfoHelpCompany from '@/components/elements/ListInfoHelpCompany';
import ListSocialMedia from '@/components/elements/ListSocialMedia';

const AsidePanel = () => {
  const { data } = useSession();
  const dispatch = useAppDispatch();

  const { lang, translations } = useLang();

  const email = data?.user?.email || 'Unknown email';
  const firstName = data?.user?.firstName || 'Unknown';
  const lastName = data?.user?.lastName || 'user';
  const photo = data?.user.photo;

  return (
    <motion.section
      className={Styles.asidePanel}
      {...basePropsForMotionAsidePanel}
    >
      <div className={Styles.asidePanel__head}>
        <LogotypeSmall />
        <button
          className={Styles.asidePanel__head_close}
          onClick={() => {
            dispatch(closePopupAsidePanel());
            removeOverflowHiddenFromBody();
          }}
        >
          <IoMdClose size={24} color={COLORS.whiteIcon} />
        </button>

        <UserCard
          firstName={firstName}
          lastName={lastName}
          email={email}
          photo={photo}
          theme='light'
        />
      </div>
      <nav className={Styles.asidePanel__main}>
        <ListLinks />
        <LanguagePanel />
        <span className={Styles.asidePanel__main_divider} />

        <ListInfoAboutCompany />

        <span className={Styles.asidePanel__main_divider} />

        <ListInfoHelpCompany />

        <span className={Styles.asidePanel__main_divider} />

        <ListSocialMedia />

        <span className={Styles.asidePanel__main_divider} />

        <button className={Styles.asidePanel__main_signOut}>
          {translations[lang].authorization.sign_out_account}
        </button>
      </nav>
    </motion.section>
  );
};

export default AsidePanel;
