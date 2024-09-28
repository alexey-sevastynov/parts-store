import ProductsList from '@/components/elements/ProductsList';
import Styles from '@/styles/modules/main-page/index.module.scss';
import { getProducts } from '@/utils/dashboards';
import useSWR from 'swr';

const RecentlyViewedProducts = () => {
  const { data: products } = useSWR('products', getProducts, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <section className={Styles.recentlyViewedProducts}>
      <h4 className={Styles.recentlyViewedProducts__title}>
        Останні переглянуті товари
      </h4>

      {products?.data && <ProductsList items={products.data} />}
    </section>
  );
};

export default RecentlyViewedProducts;
