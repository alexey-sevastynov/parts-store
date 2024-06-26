'use client';
import { useLang } from '@/hooks/useLang';
import { IProduct } from '@/types/goods';
import React from 'react';

const AnalogsPage = ({
  data,
}: {
  data: { msg: string; status: number; product?: IProduct };
}) => {
  const { lang, translations } = useLang();

  return <section className='analogs-page'>analogs</section>;
};

export default AnalogsPage;
