import { SIZE_ICON } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/elements/index.module.scss';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook, FaTelegram, FaViber } from 'react-icons/fa6';
import { SiYoutubemusic } from 'react-icons/si';

const ListSocialMedia = () => {
  const { lang, translations } = useLang();
  return (
    <section className={Styles.listSocialMedia}>
      <h4 className={Styles.listSocialMedia__title}>
        {translations[lang].common.social_networks}
      </h4>

      <ul className={Styles.listSocialMedia__list}>
        <li className={Styles.listSocialMedia__list_item}>
          <a href='https://www.facebook.com'>
            <FaFacebook
              className={Styles.listSocialMedia__list_item_icon}
              size={SIZE_ICON}
            />
          </a>
        </li>
        <li className={Styles.listSocialMedia__list_item}>
          <a href='https://www.instagram.com'>
            <AiFillInstagram
              className={Styles.listSocialMedia__list_item_icon}
              size={SIZE_ICON}
            />
          </a>
        </li>
        <li className={Styles.listSocialMedia__list_item}>
          <a href='https://www.youtube.com'>
            <SiYoutubemusic
              className={Styles.listSocialMedia__list_item_icon}
              size={SIZE_ICON}
            />
          </a>
        </li>
        <li className={Styles.listSocialMedia__list_item}>
          <a href='https://www.viber.com'>
            <FaViber
              className={Styles.listSocialMedia__list_item_icon}
              size={SIZE_ICON}
            />
          </a>
        </li>
        <li className={Styles.listSocialMedia__list_item}>
          <a href='https://web.telegram.org/'>
            <FaTelegram
              className={Styles.listSocialMedia__list_item_icon}
              size={SIZE_ICON}
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ListSocialMedia;
