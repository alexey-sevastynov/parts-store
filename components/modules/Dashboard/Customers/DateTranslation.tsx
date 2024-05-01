import { useLang } from '@/hooks/useLang';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import 'dayjs/locale/en';

const DateTranslation = ({ date }: { date: string | undefined }) => {
  const { lang } = useLang();

  // Set the locale depending on the current language
  dayjs.locale(lang === 'ua' ? 'uk' : lang);

  // Date formatting using dayjs
  const formattedDate = dayjs(date).format('MMM DD, YYYY');

  return <p>{formattedDate}</p>;
};

export default DateTranslation;
