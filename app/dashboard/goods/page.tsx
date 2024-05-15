'use server';

import GoodsPage from '@/components/templates/Dashboard/GoodsPage/GoodsPage';
import { getUsers } from '@/utils/dashboards';

const Goods = async () => {
  const fetchedUsers = await getUsers();
  try {
    if (fetchedUsers.users) {
      return <GoodsPage data={fetchedUsers} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.users) {
      console.error(error);
      return (
        <GoodsPage
          data={{
            ...fetchedUsers,
            msg: 'Failed to fetch users.',
            status: 500,
          }}
        />
      );
    } else {
      console.error(error);
      return <div>Error fetching data.</div>;
    }
  }
};

export default Goods;
