import {
  deleteSelectedUsers,
  deleteUser,
  findUserById,
  getAllUsers,
} from '@/actions/authActions';
import {
  getAllCharacteristics,
  getCharacteristicById,
} from '@/actions/characteristicActions';
import { ICharacteristics } from '@/types/characteristic';
import { ILanguageStrings } from '@/types/constants';
import { IUser } from '@/types/user';
import { ChangeEvent } from 'react';

export const deleteUsers = async (
  checkboxes: { [key: string]: boolean },
  currentUserID: string | undefined
) => {
  if (currentUserID) await deleteSelectedUsers(checkboxes, currentUserID);
};

export const deleteUserAccount = async (
  id: string | undefined,
  currentUserID: string | undefined
) => {
  if (id && id !== currentUserID) {
    await deleteUser({ id });
  }
};

export const handleCheckboxChange = (
  listData: IUser[] | ICharacteristics[] | ILanguageStrings[],
  event: ChangeEvent<HTMLInputElement>,
  checkboxes: { [key: string]: boolean },
  setCheckboxes: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >,
  isAnyCheckboxChecked: boolean
) => {
  const { name, checked } = event.target;

  if (name === 'all') {
    const updatedCheckboxes: { [key: string]: boolean } = {};

    if (checked) {
      listData?.forEach((item) => {
        updatedCheckboxes[item._id as string] = true;
      });
    }

    setCheckboxes({ ...updatedCheckboxes, all: checked });
  } else {
    const updatedCheckboxes = { ...checkboxes, [name]: checked };

    if (!checked) {
      updatedCheckboxes.all = false;
    } else {
      if (isAnyCheckboxChecked && name !== 'all') {
        updatedCheckboxes.all = true;
      }
    }

    setCheckboxes(updatedCheckboxes);
  }
};

export const getUsers = async () => {
  const res = await getAllUsers();
  return res;
};

export const getUser = async (id: string) => {
  const res = await findUserById(id);
  return res;
};

export const getCharacteristics = async () => {
  const res = await getAllCharacteristics();
  return res;
};
export const getCharacteristic = async (id: string) => {
  const res = await getCharacteristicById(id);
  return res;
};
