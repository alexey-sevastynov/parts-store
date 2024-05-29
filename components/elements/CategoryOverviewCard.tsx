import Styles from '@/styles/elements/index.module.scss';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ICategoryOverviewCardProps } from '@/types/elements';

import Title from './Title';
import Paragraph from './Paragraph';

const CategoryOverviewCard = ({
  hrefImage,
  title,
  hrefLink = '/',
  description,
}: ICategoryOverviewCardProps) => {
  const [isLoadingImage, setIsLoadingImage] = React.useState(true);
  const [isErrorImage, setIsErrorImage] = React.useState(false);

  const handleImageLoad = () => {
    setIsLoadingImage(false);
  };

  const handleImageError = () => {
    setIsErrorImage(true);
    setIsLoadingImage(false);
  };

  return (
    <Link href={hrefLink}>
      <article className={Styles.categoryOverviewCard}>
        <div className={Styles.categoryOverviewCard__image}>
          {isLoadingImage && !isErrorImage && <div>Loading...</div>}
          {isErrorImage && <div>Failed to load image</div>}
          <Image
            src={hrefImage}
            alt={title}
            fill
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>

        <div className={Styles.categoryOverviewCard__title}>
          <Title size='sm'>{title}</Title>
        </div>

        <div className={Styles.categoryOverviewCard__description}>
          <Paragraph>{description}</Paragraph>
        </div>
      </article>
    </Link>
  );
};

export default CategoryOverviewCard;
