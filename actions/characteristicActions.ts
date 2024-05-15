'use server';

import Characteristic from '@/models/Characteristic';
import CharacteristicValue from '@/models/CharacteristicValue';
import { ICharacteristics } from '@/types/characteristic';
import { ILanguageStrings } from '@/types/constants';

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

export async function getCharacteristicById(characteristicId: string) {
  try {
    const characteristic = await Characteristic.findById(characteristicId);

    if (!characteristic) {
      return { msg: 'Characteristic not found.', status: 404 };
    }

    // Get the associated values of the characteristic
    const values = await CharacteristicValue.find({
      _id: { $in: characteristic.values },
    });

    return {
      characteristic: { ...characteristic.toObject(), values },
      msg: 'Characteristic found successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to retrieve characteristic.', status: 500 };
  }
}

export async function getCharacteristicValueById(valueId: string) {
  try {
    const value = await CharacteristicValue.findById(valueId);

    if (!value) {
      return { msg: 'Characteristic value not found.', status: 404 };
    }

    return {
      characteristicValue: value.toObject(),
      msg: 'Characteristic value retrieved successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to retrieve characteristic value.', status: 500 };
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

export async function updateCharacteristicNameById(
  characteristicId: string,
  names: ILanguageStrings
) {
  try {
    const characteristic = await Characteristic.findById(characteristicId);

    if (!characteristic) {
      return { msg: 'Characteristic not found.', status: 404 };
    }

    // Update characterization names in three languages
    characteristic.name = names;
    await characteristic.save();

    return {
      msg: 'Characteristic name updated successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to update characteristic name.', status: 500 };
  }
}

export async function deleteSelectedCharacteristicValues(
  selectedValueIds: string[]
) {
  try {
    // Delete each selected characteristic value
    const deletePromises = selectedValueIds.map(async (valueId) => {
      // Remove the characteristic value
      const deletedValue = await CharacteristicValue.findByIdAndDelete(valueId);

      if (!deletedValue) {
        console.log(`Characteristic value with ID ${valueId} not found.`);
        return;
      }

      // Remove references to this value from all characteristics
      await Characteristic.updateMany(
        { values: valueId },
        { $pull: { values: valueId } }
      );

      console.log(
        `Characteristic value with ID ${valueId} deleted successfully.`
      );
    });

    await Promise.all(deletePromises);

    return {
      msg: 'Selected characteristic values deleted successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: 'Failed to delete selected characteristic values.',
      status: 500,
    };
  }
}

export async function addOrUpdateCharacteristicValue(
  characteristicId: string,
  value: ILanguageStrings
) {
  try {
    // Create a new characteristic value
    const newValue = await CharacteristicValue.create(value);

    // Get the current characteristic by identifier
    const characteristic = await Characteristic.findById(characteristicId);

    if (!characteristic) {
      return { msg: 'Characteristic not found.', status: 404 };
    }

    // Check if there is a value with these language strings
    const existingValue = characteristic.values.find(
      (val: ILanguageStrings) =>
        val.en === value.en && val.ru === value.ru && val.ua === value.ua
    );

    if (existingValue) {
      // If the value already exists, update it
      existingValue.en = value.en;
      existingValue.ru = value.ru;
      existingValue.ua = value.ua;
    } else {
      // If the value does not exist, add a new value to the characteristic
      characteristic.values.push(newValue._id);
    }

    // Save the updated characteristic
    await characteristic.save();

    return {
      msg: 'Characteristic value added/updated successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to add/update characteristic value.', status: 500 };
  }
}

export async function updateCharacteristicValueById(
  valueId: string,
  newValue: ILanguageStrings
) {
  try {
    // Находим значение характеристики по его идентификатору
    const value = await CharacteristicValue.findById(valueId);

    if (!value) {
      return { msg: 'Characteristic value not found.', status: 404 };
    }

    // Обновляем языковые строки значения
    value.en = newValue.en;
    value.ru = newValue.ru;
    value.ua = newValue.ua;

    // Сохраняем обновленное значение характеристики
    await value.save();

    return { msg: 'Characteristic value updated successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to update characteristic value.', status: 500 };
  }
}
