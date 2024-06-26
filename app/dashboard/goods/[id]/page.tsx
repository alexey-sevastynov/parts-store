import { getAllBrands } from '@/actions/brandActions';
import { getProductById } from '@/actions/goodsActions';
import ProductPage from '@/components/templates/Dashboard/GoodsPage/ProductPage/ProductPage';
import { getUsers } from '@/utils/dashboards';

const Characteristics = async ({ params }: { params: { id: string } }) => {
  try {
    const fetchedProduct = await getProductById(params.id);
    const fetchedUsers = await getUsers();

    const requiredBrands = await getAllBrands();

    if (fetchedProduct && fetchedUsers && fetchedUsers.users) {
      return (
        <ProductPage
          users={fetchedUsers}
          data={fetchedProduct}
          brands={requiredBrands.brands}
          statusBrands={requiredBrands.status}
          msgBrands={requiredBrands.msg}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);

    return <div>Error fetching data.</div>;
  }
};

export default Product;
