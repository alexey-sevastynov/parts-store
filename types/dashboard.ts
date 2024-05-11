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

export interface ICustomersTableProps {
  users: IUser[];
  isLoading: boolean;
}

export interface ICharacteristicTableProps {
  characteristics: ICharacteristics[];
  isLoading: boolean;
  getCharacteristics: () => void;
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

export interface ICharacteristicInfoListProps
  extends ICharacteristicTableEditProps {}

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
