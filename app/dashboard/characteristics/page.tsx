'use server';

import CharacteristicsPage from '@/components/templates/Dashboard/CharacteristicsPage/CharacteristicsPage';
import { ICharacteristics } from '@/types/characteristic';
import { IPromiseResponse } from '@/types/dashboard';
import { fetchAndCopyData, getCharacteristics, getUsers } from '@/utils/dashboards';

const Characteristics = async () => {
  try {
    const fetchedUsers = await getUsers();
    const fetchedCharactristic = await fetchAndCopyData<IPromiseResponse<ICharacteristics[]>>(getCharacteristics);

    // Check if there is data about characteristics and users
    if (
      fetchedCharactristic &&
      fetchedUsers &&
      fetchedCharactristic.data &&
      fetchedUsers.data
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
