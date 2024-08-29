'use server';

import { getAllProducts } from '@/actions/goodsActions';
import GoodsPage from '@/components/templates/Dashboard/GoodsPage/GoodsPage';
import { IPromiseResponse } from '@/types/dashboard';
import { IProduct } from '@/types/goods';
import { IUser } from '@/types/user';
import { fetchAndCopyData, getUsers } from '@/utils/dashboards';

const Goods = async () => {
  const fetchedUsers = await fetchAndCopyData<IPromiseResponse<IUser[]>>(getUsers);
  const fetchedProducts = await fetchAndCopyData<IPromiseResponse<IProduct[]>>(getAllProducts);

  try {
    if (fetchedUsers.data) {
      return <GoodsPage users={fetchedUsers} data={fetchedProducts} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.data) {
      console.error(error);
      return (
        <GoodsPage
        users={fetchedUsers}
        data={{
          ...fetchedUsers,
          msg: 'Failed to fetch users.',
          status: 500,
          data: []
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
