import Styles from '@/styles/modules/aside-panel/index.module.scss';

import Image from 'next/image';

import { AllowedLangs } from '@/constants/lang';

import { setLang } from '@/context/features/translation/translationSlice';
import { useAppDispatch } from '@/context/hooks';
import { useLang } from '@/hooks/useLang';

const LanguagePanel = () => {
  const dispatch = useAppDispatch();
  const { lang, translations } = useLang();
  return (
    <div className={Styles.languagePanel}>
      <p className={Styles.languagePanel__title}>
        {translations[lang].aside_panel_page.language}
      </p>

      <ul className={Styles.languagePanel__list}>
        <button
          className={`${Styles.languagePanel__list_ua} ${lang === 'ua' ? Styles.languagePanel__list_active : ''}`}
          onClick={() => dispatch(setLang('ua' as AllowedLangs))}
        >
          <Image
            src={'/img/ukraine.svg'}
            alt='ukraine'
            width={20}
            height={20}
            priority
          />
          <li>UA</li>
        </button>
        <button
          className={`${Styles.languagePanel__list_ru} ${lang === 'ru' ? Styles.languagePanel__list_active : ''}`}
          onClick={() => dispatch(setLang('ru' as AllowedLangs))}
        >
          <li>RU</li>
        </button>
        <button
          className={`${Styles.languagePanel__list_en} ${lang === 'en' ? Styles.languagePanel__list_active : ''}`}
          onClick={() => dispatch(setLang('en' as AllowedLangs))}
        >
          <li>EN</li>
        </button>
      </ul>
    </div>
  );
};

export default LanguagePanel;
