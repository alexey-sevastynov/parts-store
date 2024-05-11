'use server';

import CharacteristicPage from '@/components/templates/Dashboard/CharacteristicsPage/CharacteristicPage/CharacteristicPage';

import { getCharacteristic, getUsers } from '@/utils/dashboards';

// const getCachedUserCharacteristic = unstable_cache(
//   async (id: string) => await getCharacteristic(id),
//   ['characteristic'],
//   {}
// );

const Characteristic = async ({ params }: { params: { id: string } }) => {
  try {
    // const fetchedCharacteristic = await getCachedUserCharacteristic(params.id);
    const fetchedCharacteristic = await getCharacteristic(params.id);

    const fetchedUsers = await getUsers();

    // Проверяем, есть ли данные о пользователе и список всех пользователей
    if (fetchedUsers && fetchedUsers.users) {
      return (
        <CharacteristicPage users={fetchedUsers} data={fetchedCharacteristic} />
      );
    } else {
      // Обработка случаев, когда данные отсутствуют или неполные
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    // Обработка ошибки получения данных
    return <div>Error fetching data.</div>;
  }
};

export default Characteristic;
