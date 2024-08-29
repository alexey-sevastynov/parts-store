import Brands from '@/components/modules/Dashboard/Brands/Brands';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IBrand } from '@/types/brand';
import { IUser } from '@/types/user';

const BrandsPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: brands },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: IBrand[] };
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
    </div>
  );
};

export default BrandsPage;
