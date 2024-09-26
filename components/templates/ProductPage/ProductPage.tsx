'use client';
import ProductImageSlider from '@/components/modules/ItemProduct/ProductImageSlider/ProductImageSlider';
import { IProduct } from '@/types/goods';

const ProductPage = ({
  data,
}: {
  data: { msg: string; status: number; data: IProduct | null };
}) => {
  const images = data.data?.photos?.split(',');

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
