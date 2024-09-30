import Styles from '@/styles/elements/index.module.scss';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper/modules';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { SIZE_ICON } from '@/constants/common';

const Slider = ({ images }: { images: string[] }) => {
  const swiperRef = React.useRef<SwiperRef>(null);

  const [activeIndexThumbnail, setActiveIndexThumbnail] = React.useState(0);
  const [isFirstSlide, setIsFirstSlide] = React.useState<boolean>(false);
  const [isLastSlide, setIsLastSlide] = React.useState<boolean>(true);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveIndexThumbnail(swiperRef.current.swiper.realIndex);
    }
  };

  const handleThumbnailClick = React.useCallback(
    (index: number) => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideTo(index);
        setActiveIndexThumbnail(index);
      }
    },
    [swiperRef]
  );

  const nextElementSwiper = React.useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      setActiveIndexThumbnail(swiperRef.current.swiper.realIndex);
    }
  }, [swiperRef]);

  const prevElementSwiper = React.useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
      setActiveIndexThumbnail(swiperRef.current.swiper.realIndex);
    }
  }, [swiperRef]);

  return (
    <div className={Styles.slider}>
      <button
        onClick={prevElementSwiper}
        className={Styles.slider__button_prev}
        style={{
          visibility: `${isFirstSlide ? 'visible' : 'hidden'}`,
        }}
      >
        <FaAngleLeft size={SIZE_ICON} />
      </button>
      <Swiper
        ref={swiperRef}
        className={Styles.slider__swiper}
        spaceBetween={30}
        modules={[FreeMode, Navigation]}
        grabCursor
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionStart={(swiper) =>
          setIsFirstSlide(!swiper.isBeginning)
        }
        onSlideChangeTransitionEnd={(swiper) => setIsLastSlide(!swiper.isEnd)}
      >
        {images?.map((carouselItem) => (
          <SwiperSlide
            key={carouselItem}
            className={Styles.slider__swiper_item}
          >
            <Image
              alt='product image'
              src={carouselItem}
              fill
              sizes='100%'
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={nextElementSwiper}
        className={Styles.slider__button_next}
        style={{
          visibility: `${isLastSlide && images.length > 1 ? 'visible' : 'hidden'}`,
        }}
      >
        <FaAngleRight size={SIZE_ICON} />
      </button>

      <div className={Styles.slider__thumbnails}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${Styles.slider__thumbnails_item} ${activeIndexThumbnail === index ? Styles.slider__thumbnails_active : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              alt={Styles.slider__thumbnails_item_img}
              src={image}
              width={50}
              height={50}
              objectFit='contain'
              className={Styles.slider__thumbnails_img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
