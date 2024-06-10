import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';
import { IUser } from './user';
import { ICharacteristics } from './characteristic';
import { ILanguageStrings } from './constants';
import { ICategory, ISubcategory } from './category';
import { IBrand } from './brand';

export interface IAdminAsideButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IItemNavAdminProps {
  icon: ReactNode;
  title: string;
  isActive: boolean;
  isSubMenu?: boolean;
}

export interface IAccordionItemAdminProps
  extends Omit<IItemNavAdminProps, 'title'>,
    HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  href: string;
  title: string;
}

export interface IInfoSmallPanelProps {
  icon: ReactNode;
  title: string;
  number: number;
}

export interface ICustomersItemProps extends IUser {
  isChecked: boolean;
  handleCheckboxChange: (userId: string) => void;
  handleDeleteUser: (userId: string) => void;
}

export interface IResponse {
  status: number;
  msg: string;
}

export interface IPromiseResponse<IData> extends IResponse {
  data: IData;
}

export interface ICustomersProps extends IPromiseResponse<IUser[]> {}
export interface ICharacteristicsProps
  extends IPromiseResponse<ICharacteristics[]> {}

export interface ICharacteristicProps
  extends IPromiseResponse<ICharacteristics> {}

export interface ICategoriesProps extends IPromiseResponse<ICategory[]> {}

export interface IAddSubcategoriesProps extends IPromiseResponse<ICategory> {}

export interface IAddSubSubcategoriesProps
  extends IPromiseResponse<ISubcategory> {
  idCategory: string;
}

export interface ICustomersTableProps {
  users: IUser[];
  isLoading: boolean;
}

export interface IBrandsTableProps {
  brands: IBrand[];
  isLoading: boolean;
  updateList: () => void;
}

export interface ICharacteristicTableProps {
  characteristics: ICharacteristics[];
  searchResultsCharacteristic: ICharacteristics[];
  isLoading: boolean;
  getCharacteristics: () => void;
}

export interface ICategoriesTableProps {
  categories: ICategory[];
  searchResultsCategory: ICategory[];
  isLoading: boolean;
  getCategories: () => void;
}

export interface IListAddedCharacteristicsProps {
  state: CharacteristicFormState;
  onDeleteSelected: () => void;
  checkboxes: {
    [key: string]: boolean;
  };
  setCheckboxes: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

export interface ICharacteristicTableEditProps {
  values: ILanguageStrings[];
  isLoading: boolean;
  onDeleteSelected: () => void;
  checkboxes: {
    [key: string]: boolean;
  };
  setCheckboxes: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}
export interface ICategoriesTableEditProps {
  values: ICategory[] | ISubcategory[];
  isLoading: boolean;
  onDeleteSelected: () => void;
  checkboxes: {
    [key: string]: boolean;
  };
  setCheckboxes: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  idCategory?: string;
  handleEditSubmit: (
    id: string,
    updatedData: { ua: string; ru: string; en: string }
  ) => Promise<void>;
}

export interface ICharacteristicInfoListProps
  extends ICharacteristicTableEditProps {
  updateCharacteristic: (id: string) => void;
}

export interface ICustomersList {
  users?: IUser[];
  updateListUsers: () => void;
  isLoading: boolean;
}

export interface CharacteristicFormState {
  nameEn: string;
  nameRu: string;
  nameUa: string;
  valueEn: string;
  valueRu: string;
  valueUa: string;
  values: ILanguageStrings[];
}

export interface ICharacteristicInfoNameProps {
  data: ILanguageStrings;
  id: string;
  uaName: string;
  ruName: string;
  enName: string;
  setUaName: (name: string) => void;
  setRuName: (name: string) => void;
  setEnName: (name: string) => void;
}

export interface CharacteristicRowProps {
  value: ILanguageStrings;
  isChecked: boolean;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ICharacteristicState {
  _id: string;
  name: {
    _id: string;

    en: string;
    ru: string;
    ua: string;
  };
  value: {
    _idCharacteristic: string;
    _idValueCharacteristic: string;

    en: string;
    ru: string;
    ua: string;
  };
}
