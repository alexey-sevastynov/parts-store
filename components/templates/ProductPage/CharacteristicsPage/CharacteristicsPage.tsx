'use client';

import { useLang } from '@/hooks/useLang';

import { IProduct } from '@/types/goods';

const CharacterisicsPage = ({
  data,
}: {
  data: { msg: string; status: number; product?: IProduct };
}) => {
  const { lang, translations } = useLang();

  return <section className='characteristics-page'>characteristics </section>;
};

export default CharacterisicsPage;
