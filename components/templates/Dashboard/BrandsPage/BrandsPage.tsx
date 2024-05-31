import Brands from '@/components/modules/Dashboard/Brands/Brands';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IBrand } from '@/types/brand';
import { IUser } from '@/types/user';

const BrandsPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, brands },
}: {
  users: { msg: string; status: number; users?: IUser[] };
  data: { msg: string; status: number; brands?: IBrand[] };
}) => {
  return (
    <div className='dashboard-pages'>
      {users && (
        <HeaderAdmin
          statusDataUsers={statusUsers}
          msgDataUsers={msgUsers}
          dataUsers={users}
        />
      )}

      {brands && <Brands data={brands} status={status} msg={msg} />}
      <p>dashboard-pages</p>
    </div>
  );
};

export default BrandsPage;
