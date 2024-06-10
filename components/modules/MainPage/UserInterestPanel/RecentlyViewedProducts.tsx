import { getAllProducts } from '@/actions/goodsActions';
import ProductsList from '@/components/elements/ProductsList';
import { FAKE_LIST_PRODUCTS } from '@/constants/main-page';
import Styles from '@/styles/modules/main-page/index.module.scss';
import { getProducts } from '@/utils/dashboards';
import useSWR from 'swr';

const RecentlyViewedProducts = () => {
  const { data: products, error: productsError } = useSWR(
    'products',
    getProducts,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(products);

  return (
    <section className={Styles.recentlyViewedProducts}>
      <h4 className={Styles.recentlyViewedProducts__title}>
        Останні переглянуті товари
      </h4>

      {products?.products && <ProductsList items={products.products} />}
    </section>
  );
};

export default RecentlyViewedProducts;
