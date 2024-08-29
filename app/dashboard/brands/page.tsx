'use server';

import BrandsPage from '@/components/templates/Dashboard/BrandsPage/BrandsPage';
import {  getBrands, getUsers } from '@/utils/dashboards';

const Brands = async () => {
  try {
    const fetchedUsers = await getUsers();
    const fetchedBrands = await getBrands();

    if (fetchedUsers.data) {
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
