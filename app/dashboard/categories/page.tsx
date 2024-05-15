'use server';

import CategoriesPage from '@/components/templates/Dashboard/CategoriesPage/CategoriesPage';
import { getUsers } from '@/utils/dashboards';

const Categories = async () => {
  try {
    const fetchedUsers = await getUsers();

    // Check if there is data about characteristics and users
    if (fetchedUsers.users) {
      return <CategoriesPage users={fetchedUsers} />;
    } else {
      // Handling cases where data is missing or incomplete
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    // Handling data retrieval error
    return <div>Error fetching data.</div>;
  }
};

export default Categories;
