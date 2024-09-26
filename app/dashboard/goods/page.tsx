'use server';
import GoodsPage from '@/components/templates/Dashboard/GoodsPage/GoodsPage';
import { IPromiseResponse } from '@/types/dashboard';
import { IUser } from '@/types/user';
import { fetchAndCopyData, getProducts, getUsers } from '@/utils/dashboards';

const Goods = async () => {
  const fetchedUsers =
    await fetchAndCopyData<IPromiseResponse<IUser[]>>(getUsers);
  const fetchedProducts = await getProducts();

  try {
    if (fetchedUsers.data) {
      return <GoodsPage users={fetchedUsers} data={fetchedProducts} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.data) {
      return (
        <GoodsPage
          users={fetchedUsers}
          data={{
            ...fetchedUsers,
            msg: 'Failed to fetch users.',
            status: 500,
            data: [],
          }}
        />
      );
    } else {
      return <div>Error fetching data.</div>;
    }
  }
};

export default Goods;
