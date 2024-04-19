import Styles from '@/styles/modules/main-page/index.module.scss';
import ListCategories from '../ListCategories';

const AsidePanelMain = () => {
  return (
    <section className={Styles.asidePanelMain}>
      <ListCategories />

      <span className={Styles.asidePanelMain__divider} />
    </section>
  );
};

export default AsidePanelMain;
