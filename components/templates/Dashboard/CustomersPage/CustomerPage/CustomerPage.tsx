import Customer from '@/components/modules/Dashboard/Customers/Customer/Customer';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomerPage = () => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin />

      <Customer />
    </main>
  );
};

export default CustomerPage;
