import Styles from '@/styles/modules/item-product/index.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';

import Slider from '@/components/elements/Slider';

const ProductImageSlider = ({ images }: { images: string[] }) => {
  return (
    <div className={Styles.productImageSlider}>
      <Slider images={images} />
    </div>
  );
};

export default ProductImageSlider;
