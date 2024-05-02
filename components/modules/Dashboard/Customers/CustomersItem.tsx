import Styles from '@/styles/modules/dashboard/index.module.scss';
import { ICustomersItemProps } from '@/types/dashboard';
import { IUser } from '@/types/user';
import PhotoUser from './PhotoUser';
import { extractLastFiveCharacters } from '@/utils/common';
import DateTranslation from './DateTranslation';
import { FaStreetView } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { SIZE_ICON } from '@/constants/common';

const CustomersItem = ({
  firstName,
  lastName,
  _id,
  email,
  createdAt,
  updatedAt,
  role,
  phone,
  photo,

  checkboxes,
  setCheckboxes,
}: ICustomersItemProps) => {
  return (
    <li className={Styles.customersItem}>
      <div className={Styles.customersItem__select}>
        <input type='checkbox' name={_id} />
      </div>

      <div className={Styles.customersItem__photo}>
        <PhotoUser photo={photo} firstName={firstName} lastName={lastName} />
      </div>

      {/* First name */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Имя</p>
        <p className={Styles.customersItem__description_value}>{firstName}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* Last names */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Фамилия</p>
        <p className={Styles.customersItem__description_value}>{lastName}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* Id client */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>ID клиента</p>
        <p className={Styles.customersItem__description_value}>
          {extractLastFiveCharacters(_id || '00000')}
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* Email client */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Email</p>
        <p className={Styles.customersItem__description_value}>{email}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* phone client */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Телефон</p>
        <p className={Styles.customersItem__description_value}>
          {phone || 'неизвестно'}
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* created */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Создан</p>
        <p className={Styles.customersItem__description_value}>
          <DateTranslation date={createdAt} />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* update */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Изменен</p>
        <p className={Styles.customersItem__description_value}>
          <DateTranslation date={updatedAt} />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* role */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Роль</p>
        <p className={Styles.customersItem__description_value}>{role}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* block */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>Блок</p>
        <p className={Styles.customersItem__description_value}>{'-'}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      <div className={Styles.customersItem__btns}>
        <button className={Styles.customersItem__btns_view}>
          <FaStreetView size={SIZE_ICON} />
        </button>
        <button className={Styles.customersItem__btns_delete}>
          <MdDelete size={SIZE_ICON} />
        </button>
      </div>
    </li>
  );
};

export default CustomersItem;
