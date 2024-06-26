'use client';

import { useLang } from '@/hooks/useLang';

import { IProduct } from '@/types/goods';

const ProductPage = ({
  data,
}: {
  data: { msg: string; status: number; product?: IProduct };
}) => {
  const { lang, translations } = useLang();

  return <section className='product-page'>all about product</section>;
};

export default ProductPage;
