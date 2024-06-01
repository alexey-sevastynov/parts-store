import { getAllBrands } from '@/actions/brandActions';
import AddPage from '@/components/templates/Dashboard/GoodsPage/AddPage/AddPage';

const Add = async () => {
  try {
    const requiredBrands = await getAllBrands();

    if (requiredBrands.brands)
      return (
        <AddPage
          brands={requiredBrands.brands}
          statusBrands={requiredBrands.status}
          msgBrands={requiredBrands.msg}
        />
      );
    else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error fetching data.</div>;
  }
};

export default Add;
