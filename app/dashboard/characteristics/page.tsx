'use server';

import CharacteristicsPage from '@/components/templates/Dashboard/CharacteristicsPage/CharacteristicsPage';
import { getCharacteristics, getUsers } from '@/utils/dashboards';

const Characteristics = async () => {
  try {
    const fetchedCharactristic = await getCharacteristics();
    const fetchedUsers = await getUsers();

    // Check if there is data about characteristics and users
    if (
      fetchedCharactristic &&
      fetchedUsers &&
      fetchedCharactristic.characteristics &&
      fetchedUsers.users
    ) {
      return (
        <CharacteristicsPage data={fetchedCharactristic} users={fetchedUsers} />
      );
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

export default Characteristics;
