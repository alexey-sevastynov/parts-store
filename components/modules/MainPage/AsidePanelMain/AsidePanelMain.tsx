import Styles from '@/styles/modules/main-page/index.module.scss';
import ListCategories from '../ListCategories';
import AuthUser from './AuthUser';
import ListSocialMedia from '@/components/elements/ListSocialMedia';
import ListInfoUseful from '@/components/elements/ListInfoUseful';
import ListInfoInternetStore from '@/components/elements/ListInfoInternetStore';

const AsidePanelMain = () => {
  return (
    <section className={Styles.asidePanelMain}>
      <ListCategories />

      <span className={Styles.asidePanelMain__divider} />

      <AuthUser />
      <span className={Styles.asidePanelMain__divider} />

      <ListSocialMedia />
      <span className={Styles.asidePanelMain__divider} />

      <ListInfoInternetStore theme='light' />
      <span className={Styles.asidePanelMain__divider} />

      <ListInfoUseful theme='light' />
      <span className={Styles.asidePanelMain__divider_last} />
    </section>
  );
};

export default AsidePanelMain;
