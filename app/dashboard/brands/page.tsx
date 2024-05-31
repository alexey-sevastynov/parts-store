'use server';

import { getAllBrands } from '@/actions/brandActions';
import BrandsPage from '@/components/templates/Dashboard/BrandsPage/BrandsPage';
import { getUsers } from '@/utils/dashboards';

const Brands = async () => {
  try {
    const fetchedBrands = await getAllBrands();

    const fetchedUsers = await getUsers();

    if (fetchedUsers.users) {
      return <BrandsPage users={fetchedUsers} data={fetchedBrands} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);

    return <div>Error fetching data.</div>;
  }
};

export default Brands;
