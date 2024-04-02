'use client';

import translationJson from '@/public/translation/translation.json';
import { useAppSelector } from '@/context/hooks';

export const useLang = () => {
  const lang = useAppSelector((item) => item.translation.currentLanguage);

  const translations = translationJson;

  return { lang, translations };
};

//______template for using to component
// const { lang, translations } = useLang();

//______example to html
// {translations[lang].main_menu.contacts}
