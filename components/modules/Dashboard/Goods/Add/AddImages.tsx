import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Image from 'next/image';

import { UploadFileResponse } from '@/types/uploathing-image/client';

import { useLang } from '@/hooks/useLang';

import UploadImage from '@/components/elements/UploadImage';
import Title from '@/components/elements/Title';
import InfoIconWithHint from '@/components/elements/InfoIconWithHint';

const AddImages = ({
  image,
  setImage,
}: {
  image: UploadFileResponse[];
  setImage: React.Dispatch<React.SetStateAction<UploadFileResponse[]>>;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.addImages}>
      <Title className={Styles.addImages__title} size='sm' weight='semiBold'>
        {translations[lang].dashboard_page.image_goods}
      </Title>
      <div className={Styles.addImages__images}>
        <UploadImage
          image={image}
          setImage={setImage}
          buttonText='Add images'
          msgMaxSize='max 4 photos, on 2Mb'
        />

        {image.length > 0 &&
          image.map((item) => (
            <div className={Styles.addImages__images_item} key={item.key}>
              <Image
                src={item.url}
                alt='image'
                width={200}
                height={200}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
      </div>

      <div className={Styles.addImages__warning}>
        <InfoIconWithHint
          text={translations[lang].dashboard_page.images_warning_message}
        />
      </div>
    </div>
  );
};

export default AddImages;
