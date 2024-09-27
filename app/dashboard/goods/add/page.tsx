import { getAllBrands } from '@/actions/brandActions';
import AddPage from '@/components/templates/Dashboard/GoodsPage/AddPage/AddPage';
import { getUsers } from '@/utils/dashboards';

const Add = async () => {
  try {
    const requiredBrands = await getAllBrands();
    const fetchedUsers = await getUsers();

    if (requiredBrands.data && fetchedUsers.data)
      return (
        <AddPage
          brands={requiredBrands.data}
          brandsStatus={requiredBrands.status}
          brandsMsg={requiredBrands.msg}
          data={fetchedUsers}
        />
      );
    else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    return <div>Error fetching data.</div>;
  }
};

export default Add;
