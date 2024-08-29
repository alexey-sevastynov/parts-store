import {
  changeUserRole,
  deleteSelectedUsers,
  deleteUser,
  findUserById,
  getAllUsers,
} from '@/actions/authActions';
import { getAllBrands, getBrandById } from '@/actions/brandActions';
import { getAllCategories, getCategoryById, getSubcategoryById, getSubSubCategories, getSubSubcategoriesByIds } from '@/actions/categoryActions';
import {
  getAllCharacteristics,
  getCharacteristicById,
} from '@/actions/characteristicActions';
import { getAllProducts } from '@/actions/goodsActions';
import { Role } from '@/constants/user';
import { IBrand } from '@/types/brand';
import { ICategory, ISubSubcategory, ISubcategory } from '@/types/category';
import { ICharacteristics } from '@/types/characteristic';
import { ILanguageStrings } from '@/types/constants';
import { IPromiseResponse, IResponse } from '@/types/dashboard';
import { IProduct } from '@/types/goods';
import { IUser } from '@/types/user';
import { ChangeEvent } from 'react';

export async function fetchAndCopyData<T>(asyncDataFn: () => Promise<T>): Promise<T> {
  const data = await asyncDataFn();
  const deepCopy = JSON.parse(JSON.stringify(data));
  return deepCopy
}

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
  listData:
    | IUser[]
    | ICharacteristics[]
    | ILanguageStrings[]
    | ICategory[]
    | ISubcategory[]
    | ISubSubcategory[]
    | IBrand[]
    | IProduct[],
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

// user

export const getUsers = async () => {
  const res = await fetchAndCopyData<IPromiseResponse<IUser[]>>(getAllUsers);
  return res;
};

export const getUser = async (id: string) => {
  const res = await fetchAndCopyData<IPromiseResponse<IUser>>(() => findUserById(id));
  return res;
};

export const setUserRole = async (id: string, role: Role.admin | Role.user) => {
  const res = await fetchAndCopyData<IPromiseResponse<Role.admin | Role.user | null>>(() => changeUserRole({id, role}));
  return res;
};

// characteristic

export const getCharacteristics = async () => {
  const res = await fetchAndCopyData<IPromiseResponse<ICharacteristics[]>>(getAllCharacteristics);
  return res;
};
export const getCharacteristic = async (id: string) => {
  const res = await fetchAndCopyData<IPromiseResponse<ICharacteristics>>(() => getCharacteristicById(id)) 
  return res;
};

// subcategorie

export const getSubcategories = async (categoryId: string) => {
  const res = await getCategories();

  if (res.data) {
    const category = res.data.find(
      (category) => category._id === categoryId
    );

    if (category) {
      console.log('category.subcategories:', category.subcategories);

      return category.subcategories ;
    }
  }

  return [];
};

// product

export const getProducts = async () => {
  const res = await fetchAndCopyData<IPromiseResponse<IProduct[]>>(getAllProducts);
  return res;
};

// brand

export const getBrands = async () => {
  const res = await fetchAndCopyData<IPromiseResponse<IBrand[]>>(getAllBrands);
  return res;
};

export const getBrand = async (id: string) => {
  const res = await fetchAndCopyData<IPromiseResponse<IBrand>>(() => getBrandById(id));
  return res;
};

// category

export const getCategories = async () => {
  const res = await fetchAndCopyData<IPromiseResponse<ICategory[]>>(getAllCategories) 
  return res;
};

export const getCategory = async (id: string) => {
  const res = await fetchAndCopyData<IPromiseResponse<ICategory>>(() => getCategoryById(id));
  return res;
}

export const getSubcategory = async (id: string) => {
  const res = await fetchAndCopyData<IPromiseResponse<ISubcategory>>(() => getSubcategoryById(id));
  return res;
}

export const getAllSubSubCategories = async () => {
  const res = await fetchAndCopyData<IPromiseResponse<ISubSubcategory[]>>(getSubSubCategories);
  return res;
} 

export const getAllSubSubCategoriesByIds = async (ids: string[]) => await fetchAndCopyData<IPromiseResponse<ISubSubcategory[]>>(() => getSubSubcategoriesByIds(ids)); 