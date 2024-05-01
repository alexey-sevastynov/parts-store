import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useAppDispatch } from '@/context/hooks';
import { useLang } from '@/hooks/useLang';

import { AllowedLangs } from '@/constants/lang';
import { setLang } from '@/context/features/translation/translationSlice';

const LanguagePanelAdmin = () => {
  const dispatch = useAppDispatch();
  const { lang, translations } = useLang();

  const buttonStyle = (selectLang: AllowedLangs) =>
    `${Styles.languagePanelAdmin__button} ${lang === selectLang && Styles.active}`;

  return (
    <div className={Styles.languagePanelAdmin}>
      <button
        className={buttonStyle(AllowedLangs.ua)}
        onClick={() => dispatch(setLang(AllowedLangs.ua))}
      >
        UA
      </button>
      <button
        className={buttonStyle(AllowedLangs.ru)}
        onClick={() => dispatch(setLang(AllowedLangs.ru))}
      >
        RU
      </button>
      <button
        className={buttonStyle(AllowedLangs.en)}
        onClick={() => dispatch(setLang(AllowedLangs.en))}
      >
        EN
      </button>
    </div>
  );
};

export default LanguagePanelAdmin;
