'use client';

import ProductImageSlider from '@/components/modules/ItemProduct/ProductImageSlider/ProductImageSlider';
import { useLang } from '@/hooks/useLang';

import { IProduct } from '@/types/goods';

const ProductPage = ({
  data,
}: {
  data: { msg: string; status: number; product?: IProduct };
}) => {
  const { lang, translations } = useLang();

  const images = data.product?.photos?.split(',');

  return (
    <section className='product-page'>
      {images && (
        <div className='product-page__title-wrapper'>
          <ProductImageSlider images={images} />
          <div className='product-page__title-wrapper_title'>dsfds</div>
        </div>
      )}
    </section>
  );
};

export default ProductPage;
