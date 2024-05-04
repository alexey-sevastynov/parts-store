import Styles from '@/styles/modules/dashboard/index.module.scss';

import { FaStreetView } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

import { SIZE_ICON } from '@/constants/common';

import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { color } from 'framer-motion';
import { COLORS } from '@/constants/colors';

const CustomersItemLoading = ({}) => {
  return (
    <li className={Styles.customersItem}>
      <div className={Styles.customersItem__select}>
        <button className={Styles.customersItem__select_delete}></button>

        <input
          className={Styles.customersItem__select_checkboxs}
          type='checkbox'
        />
      </div>

      <div className={Styles.customersItem__photo}>
        <MyLoaderPhoto
          className={`${Styles.photoUser__photo} ${Styles.photoUser__photo_custom}`}
        />
      </div>

      {/* First name */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* Last names */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* code client */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* Email client */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* phone client */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* created */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* update */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* role */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      {/* block */}
      <div className={Styles.customersItem__description}>
        <p className={Styles.customersItem__description_key}>
          <MyLoaderParagraph />
        </p>
        <p className={Styles.customersItem__description_value}>
          <MyLoaderParagraph />
        </p>
        <span className={Styles.customersItem__description_line} />
      </div>

      <div className={Styles.customersItem__btns}>
        <button
          className={Styles.customersItem__btns_view}
          disabled
          style={{ backgroundColor: COLORS.grey }}
        >
          <FaStreetView size={SIZE_ICON} color={COLORS.whiteIcon} />
        </button>
        <button
          className={Styles.customersItem__btns_delete}
          disabled
          style={{ backgroundColor: COLORS.grey }}
        >
          <MdDelete size={SIZE_ICON} color={COLORS.whiteIcon} />
        </button>
      </div>
    </li>
  );
};

export default CustomersItemLoading;

const MyLoaderParagraph = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={`100%`}
    height={14}
    viewBox='0 0 100% 20'
    backgroundColor='#c6c6c6'
    foregroundColor='#e5e5e5'
    {...props}
  >
    <rect x='0' y='0' rx='1' ry='1' width='100%' height='14' />
  </ContentLoader>
);

const MyLoaderPhoto = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={`100%`}
    height={96}
    viewBox='0 0 100% 96'
    backgroundColor='#c6c6c6'
    foregroundColor='#e5e5e5'
    {...props}
  >
    <circle cx='48' cy='48' r='48' />;
  </ContentLoader>
);
