'use server';

import CategoriesPage from '@/components/templates/Dashboard/CategoriesPage/CategoriesPage';
import { getCategories, getUsers } from '@/utils/dashboards';

const Categories = async () => {
  try {
    const fetchedUsers = await getUsers();
    const fetchedCategories = await getCategories();

    // Check if there is data about characteristics and users
    if (fetchedUsers && fetchedCategories) {
      return <CategoriesPage users={fetchedUsers} data={fetchedCategories} />;
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
