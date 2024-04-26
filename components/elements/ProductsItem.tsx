import { SIZE_ICON } from '@/constants/common';
import Image from 'next/image';
import Styles from '@/styles/elements/index.module.scss';
import { IItemProduct } from '@/types/elements';
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import { FaArrowDownLong } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const ProductsItem = ({
  item,
  lengthItems,
  showMoreItem,
  setShowMoreItem,
}: {
  item: IItemProduct;
  lengthItems: number;
  showMoreItem: boolean;
  setShowMoreItem: (showMoreItem: boolean) => void;
}) => {
  const {
    photos,
    brand,
    name,
    price,
    salePrice,
    availability,
    quantityAvailable,
  } = item;

  const { lang, translations } = useLang();

  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  const image = photos?.[0] ?? '/img/no-image.png';

  const availabilityItem = (
    availability: boolean,
    quantityAvailable: number
  ) => {
    if (!availability) return 'Закінчився';
    if (quantityAvailable === 0) return 'Немає в наявності';
  };

  const priceBlock = salePrice ? (
    <>
      <p className={Styles.productsItem__price_old}>{price} ₴</p>
      <p className={Styles.productsItem__price_new}>{salePrice} ₴</p>
    </>
  ) : (
    <>
      <p className={Styles.productsItem__price_current}>{price} ₴</p>
    </>
  );

  console.log(lengthItems < 7);

  return (
    <motion.li
      className={`${Styles.productsItem} ${showMoreItem ? Styles.wrap : ''}`}
    >
      <button
        className={Styles.productsItem__favorite}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? (
          <MdFavorite size={SIZE_ICON} />
        ) : (
          <MdFavoriteBorder size={SIZE_ICON} />
        )}
      </button>

      <Link className={Styles.productsItem__image} href={'/'}>
        <Image src={image} alt={name[lang]} fill />
      </Link>

      <Link className={Styles.productsItem__name} href={'/'}>
        {name[lang]}
      </Link>

      <p className={Styles.productsItem__brand}>{brand}</p>

      <div className={Styles.productsItem__price}>{priceBlock}</div>

      <div className={Styles.productsItem__availability}>
        <p>{availabilityItem(availability, quantityAvailable)}</p>
      </div>

      {!showMoreItem && (
        <button
          className={Styles.productsItem__more}
          onClick={() => setShowMoreItem(true)}
        >
          <p>Показати ще</p>
          <FaArrowDownLong size={10} />
        </button>
      )}
    </motion.li>
  );
};

export default ProductsItem;