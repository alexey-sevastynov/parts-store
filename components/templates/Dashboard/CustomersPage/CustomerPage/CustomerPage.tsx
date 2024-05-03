import Customer from '@/components/modules/Dashboard/Customers/Customer/Customer';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomerPage = () => {
  return (
    <main className='customers-page'>
      <HeaderAdmin />

      <Customer />
    </main>
  );
};

export default CustomerPage;
