import Styles from '@/styles/modules/dashboard/index.module.scss';

import Title from '@/components/elements/Title';
import { useLang } from '@/hooks/useLang';
import ItemInfoLoader from './ItemInfoLoader';
import ItemInfoPhotoLoader from './ItemInfoPhotoLoader';
import ButtonLoader from './ButtonLoader';

const CustomerInfoLoading = () => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.customerInfoLoading}>
      <span className={Styles.customerInfo__line} />
      <Title size='sm' className={Styles.customerInfo__title}>
        {translations[lang].dashboard_page.user_info}
      </Title>

      <form className={Styles.customerInfo__form}>
        <div className={Styles.customerInfo__content}>
          <ul className={Styles.customerInfo__content_list}>
            {/* ____________first name */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>

            {/* ____________last name */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>

            {/* ____________email */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>

            {/* ____________mobile */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>

            {/* ____________createdAt */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>

            {/* ____________updatedAt */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>

            {/* ____________role */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>

            {/* ____________blocked */}
            <li className={Styles.customerInfo__content_list_item}>
              <ItemInfoLoader />
            </li>
          </ul>

          <div className={Styles.customerInfo__content_code}>
            <ItemInfoPhotoLoader />
          </div>
        </div>

        <div className={Styles.customerInfo__btns}>
          <ButtonLoader />
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoLoading;
