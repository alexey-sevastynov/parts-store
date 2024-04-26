import ProductsList from '@/components/elements/ProductsList';
import { FAKE_LIST_PRODUCTS } from '@/constants/main-page';
import Styles from '@/styles/modules/main-page/index.module.scss';

const RecentlyViewedProducts = () => {
  return (
    <section className={Styles.recentlyViewedProducts}>
      <h4 className={Styles.recentlyViewedProducts__title}>
        Останні переглянуті товари
      </h4>

      <ProductsList items={FAKE_LIST_PRODUCTS} />
    </section>
  );
};

export default RecentlyViewedProducts;
