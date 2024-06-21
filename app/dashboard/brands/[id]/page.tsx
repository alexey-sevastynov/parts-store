'use server';

import { getBrandById } from '@/actions/brandActions';
import BrandPage from '@/components/templates/Dashboard/BrandsPage/BrandPage/BrandPage';

import { getUsers } from '@/utils/dashboards';

const Brand = async ({ params }: { params: { id: string } }) => {
  try {
    const fetchedBrand = await getBrandById(params.id);
    const fetchedUsers = await getUsers();

    if (fetchedUsers && fetchedUsers.users) {
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
