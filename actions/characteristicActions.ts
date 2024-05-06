'use server';

import Characteristic from '@/models/Characteristic';
import CharacteristicValue from '@/models/CharacteristicValue';
import { ICharacteristics } from '@/types/characteristic';

export async function createCharacteristic(characteristics: ICharacteristics) {
  try {
    const values = await CharacteristicValue.create(characteristics.values);

    const characteristic = new Characteristic({
      name: characteristics.name,
      values: values.map((value) => value._id),
    });

    await characteristic.save();

    return { msg: 'Characteristic created successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to create characteristic.', status: 500 };
  }
}

export async function getAllCharacteristics() {
  try {
    const characteristics = await Characteristic.find();
    const populatedCharacteristics = await Promise.all(
      characteristics.map(async (characteristic) => {
        const values = await CharacteristicValue.find({
          _id: { $in: characteristic.values },
        });
        return { ...characteristic.toObject(), values };
      })
    );

    return {
      characteristics: populatedCharacteristics,
      msg: 'Characteristics get all successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to retrieve characteristics.', status: 500 };
  }
}

export async function deleteCharacteristicById(characteristicId: string) {
  try {
    const deletedCharacteristic =
      await Characteristic.findByIdAndDelete(characteristicId);

    if (!deletedCharacteristic) {
      return { msg: 'Characteristic not found.', status: 404 };
    }

    // Удаляем также связанные значения характеристики
    await CharacteristicValue.deleteMany({
      _id: { $in: deletedCharacteristic.values },
    });

    return { msg: 'Characteristic deleted successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete characteristic.', status: 500 };
  }
}

export async function deleteCharacteristicValueById(valueId: string) {
  try {
    const deletedValue = await CharacteristicValue.findByIdAndDelete(valueId);

    if (!deletedValue) {
      return { msg: 'Characteristic value not found.', status: 404 };
    }

    // Удаляем ссылки на это значение из всех характеристик
    await Characteristic.updateMany(
      { values: valueId },
      { $pull: { values: valueId } }
    );

    return { msg: 'Characteristic value deleted successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete characteristic value.', status: 500 };
  }
}

export async function deleteSelectedCharacteristics(
  selectedCharacteristicIds: string[]
) {
  try {
    // Delete each selected characteristic
    const deletePromises = selectedCharacteristicIds.map(
      async (characteristicId) => {
        // Remove the characteristic
        const deletedCharacteristic =
          await Characteristic.findByIdAndDelete(characteristicId);

        if (!deletedCharacteristic) {
          console.log(`Characteristic with ID ${characteristicId} not found.`);
          return;
        }

        // Delete linked characteristic values
        await CharacteristicValue.deleteMany({
          _id: { $in: deletedCharacteristic.values },
        });

        console.log(
          `Characteristic with ID ${characteristicId} deleted successfully.`
        );
      }
    );

    await Promise.all(deletePromises);

    return {
      msg: 'Selected characteristics deleted successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete selected characteristics.', status: 500 };
  }
}

export async function deleteAllCharacteristics() {
  try {
    // Получаем список всех характеристик
    const { characteristics } = await getAllCharacteristics();

    if (characteristics) {
      if (characteristics.length === 0) {
        // Если список пуст, возвращаем сообщение об этом
        return { msg: 'No characteristics to delete.', status: 400 };
      }

      // Получаем идентификаторы всех характеристик
      const characteristicIds = characteristics.map(
        (characteristic) => characteristic._id
      );

      // Удаляем каждую характеристику
      await Promise.all(
        characteristicIds.map(async (characteristicId) => {
          await deleteCharacteristicById(characteristicId);
        })
      );

      return { msg: 'All characteristics deleted successfully!', status: 200 };
    } else {
      return { msg: 'Characteristics not found.', status: 400 };
    }
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete all characteristics.', status: 500 };
  }
}

// export async function getAllCharacteristics() {
//   try {
//     const characteristics = await Characteristic.find().populate('values');

//     return {
//       characteristics,
//       msg: 'Characteristics get all successfully!',
//       status: 200,
//     };
//   } catch (error) {
//     console.error(error);
//     return { msg: 'Failed to retrieve characteristics.', status: 500 };
//   }
// }

// // Function for adding data to a new collection
// export async function createCharacteristic(characteristics: ICharacteristics) {
//   try {
//     // Creating a new characteristic object
//     const characteristic = new Characteristic({
//       name: {
//         en: characteristics.name.en,
//         ru: characteristics.name.ru,
//         ua: characteristics.name.ua,
//       },
//       value: characteristics.value.map((value) => ({
//         en: value.en,
//         ru: value.ru,
//         ua: value.ua,
//       })),
//     });

//     // Saving a new characteristic to the database
//     await characteristic.save();

//     return { msg: 'Characteristic created successfully!', status: 200 };
//   } catch (error) {
//     console.error(error);
//     return { msg: 'Failed to create characteristic.', status: 500 };
//   }
// }

// // Function to get all characteristics from the collection
// export async function getAllCharacteristics() {
//   try {
//     const characteristics = await Characteristic.find().populate('value');

//     return {
//       characteristics,
//       msg: 'Characteristics get all successfully!',
//       status: 201,
//     };
//   } catch (error) {
//     console.error(error);
//     return { msg: 'Failed to retrieve characteristics.', status: 500 };
//   }
// }
