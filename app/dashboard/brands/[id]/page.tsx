'use server';

import BrandPage from '@/components/templates/Dashboard/BrandsPage/BrandPage/BrandPage';
import {  getBrand, getUsers } from '@/utils/dashboards';

const Brand = async ({ params }: { params: { id: string } }) => {
  try {
    const fetchedUsers = await getUsers();
    const fetchedBrand = await getBrand(params.id);

    if (fetchedUsers && fetchedUsers.data) {
      return <BrandPage users={fetchedUsers} data={fetchedBrand} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);

    return <div>Error fetching data.</div>;
  }
};

export default Brand;
