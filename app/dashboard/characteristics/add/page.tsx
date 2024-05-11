import AddPage from '@/components/templates/Dashboard/CharacteristicsPage/AddPage/AddPage';
import { getUsers } from '@/utils/dashboards';

const Add = async () => {
  try {
    const fetchedUsers = await getUsers();

    if (fetchedUsers.users) {
      return <AddPage users={fetchedUsers} />;
    } else {
      // Handling the case when the data does not contain users
      return (
        <AddPage
          users={{ msg: fetchedUsers.msg, status: fetchedUsers.status }}
        />
      );
    }
  } catch (error) {
    console.error(error);
    // Handling data retrieval error
    return <AddPage users={{ msg: 'Failed to fetch users.', status: 500 }} />;
  }
};

export default Add;
