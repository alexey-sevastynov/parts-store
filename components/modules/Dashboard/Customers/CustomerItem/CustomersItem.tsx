import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useSession } from 'next-auth/react';

import { FaStreetView } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

import { useLang } from '@/hooks/useLang';
import { ICustomersItemProps } from '@/types/dashboard';

import { deleteUserAccount } from '@/utils/dashboards';
import { extractLastFiveCharacters } from '@/utils/common';

import { ROUTES, SIZE_ICON } from '@/constants/common';

import PhotoUser from '../PhotoUser';

import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import Link from 'next/link';
import DateTranslation from '@/components/elements/DateTranslation';

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
  isBlocked,

  isChecked,
  handleCheckboxChange,
  handleDeleteUser,
}: ICustomersItemProps) => {
  const { data } = useSession();
  const currentUserID = data?.user._id;

  const { lang, translations } = useLang();

  const handleDeleteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Prevent checkbox toggle when delete button is clicked
    handleDeleteUser(_id);
  };

  return (
    <li
      className={`${Styles.customersItem} ${isChecked && Styles.activeSelect}`}
    >
      <div className={Styles.customersItem__select}>
        {isChecked && (
          <button
            className={Styles.customersItem__select_delete}
            onClick={handleDeleteButtonClick}
          >
            {translations[lang].dashboard_page.delete_selected_users}
          </button>
        )}

        <input
          className={Styles.customersItem__select_checkboxs}
          name={_id}
          checked={isChecked}
          onChange={() => handleCheckboxChange(_id)}
          type='checkbox'
        />
      </div>

      <div className={Styles.customersItem__photo}>
        <Link href={ROUTES.VIEW_CUSTOMER_BY_ID(_id)}>
          <PhotoUser photo={photo} firstName={firstName} lastName={lastName} />
        </Link>
      </div>

      {/* First name */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          {translations[lang].dashboard_page.first_name}
        </p>
        <p className={Styles.customersItem__description_value}>{firstName}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* Last names */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          {translations[lang].dashboard_page.last_name}
        </p>
        <p className={Styles.customersItem__description_value}>{lastName}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* code client */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          {translations[lang].dashboard_page.code}
        </p>
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
        <p className={Styles.customersItem__description_key}>
          {translations[lang].dashboard_page.phone}
        </p>
        <p className={Styles.customersItem__description_value}>
          {phone || 'неизвестно'}
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* created */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          {translations[lang].dashboard_page.created}
        </p>
        <p className={Styles.customersItem__description_value}>
          <DateTranslation date={createdAt} />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* update */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          {translations[lang].dashboard_page.updated}
        </p>
        <p className={Styles.customersItem__description_value}>
          <DateTranslation date={updatedAt} />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* role */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          {translations[lang].dashboard_page.role}
        </p>
        <p className={Styles.customersItem__description_value}>{role}</p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* block */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          {' '}
          {translations[lang].dashboard_page.blocked}
        </p>
        <p className={Styles.customersItem__description_value}>
          {isBlocked
            ? translations[lang].common.yes
            : translations[lang].common.no}
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      <div className={Styles.customersItem__btns}>
        <button disabled className={Styles.customersItem__btns_view}>
          <FaStreetView size={SIZE_ICON} />
        </button>
        <button
          className={Styles.customersItem__btns_delete}
          onClick={() => deleteUserAccount(_id, currentUserID)}
        >
          <MdDelete size={SIZE_ICON} />
        </button>
      </div>
    </li>
  );
};

export default CustomersItem;
