'use server';

import CharacteristicPage from '@/components/templates/Dashboard/CharacteristicsPage/CharacteristicPage/CharacteristicPage';

import { getCharacteristic, getUsers } from '@/utils/dashboards';

const Characteristic = async ({ params }: { params: { id: string } }) => {
  try {
    const fetchedCharacteristic = await getCharacteristic(params.id);

    const fetchedUsers = await getUsers();

    if (fetchedUsers && fetchedUsers.data) {
      return (
        <CharacteristicPage users={fetchedUsers} data={fetchedCharacteristic} />
      );
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    return <div>Error fetching data.</div>;
  }
};

export default Characteristic;
