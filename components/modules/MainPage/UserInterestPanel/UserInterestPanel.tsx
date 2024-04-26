import Styles from '@/styles/modules/main-page/index.module.scss';
import CartNotificationBar from './CartNotificationBar';
import { FAKE_ITEMS_BASKET_NOTIFICATON } from '@/constants/main-page';
import RecentlyViewedProducts from './RecentlyViewedProducts';

const UserInterestPanel = () => {
  return (
    <div className={Styles.userInterestPanel}>
      <CartNotificationBar items={FAKE_ITEMS_BASKET_NOTIFICATON} />

      <RecentlyViewedProducts />
    </div>
  );
};

export default UserInterestPanel;
