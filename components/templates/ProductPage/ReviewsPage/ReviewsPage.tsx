'use client';
import { useLang } from '@/hooks/useLang';
import { IProduct } from '@/types/goods';
import React from 'react';

const ReviewsPage = ({
  data,
}: {
  data: { msg: string; status: number; product?: IProduct };
}) => {
  const { lang, translations } = useLang();

  return <main className=''>rewites </main>;
};

export default ReviewsPage;
