import Styles from '@/styles/modules/dashboard/index.module.scss';
import React from 'react';
import Image from 'next/image';
import { UploadFileResponse } from '@/types/uploathing-image/client';
import { useLang } from '@/hooks/useLang';
import Title from '@/components/elements/Title';
import InfoIconWithHint from '@/components/elements/InfoIconWithHint';
import { Reorder } from 'framer-motion';
import ImageItem from './ImageItem';
import ImageUploadButton from './ImageUploadButton';

const AddImages = ({
  images = [],
  setImages,
}: {
  images: UploadFileResponse[];
  setImages: React.Dispatch<React.SetStateAction<UploadFileResponse[]>>;
}) => {
  const { lang, translations } = useLang();

  const [isUploading, setIsUploading] = React.useState(false);

  const handleImageUpload = (newImages: UploadFileResponse[]) => {
    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
  };

  const handleRemoveImage = async (img: UploadFileResponse, index: number) => {
    const fetchRes = await fetch('/api/uploadthing', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: img.url }),
    });

    const fetchResult = await fetchRes.json();

    if (fetchRes.ok) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      console.error('Failed to delete image:', fetchResult);
    }
  };

  const handleRotateImage = (index: number) => {
    // TODO: [ Implement rotation functionality if needed or removed functionality ]
  };

  const onReorder = (reorderedItems: UploadFileResponse[]) => {
    setImages(reorderedItems.filter((item) => item !== null));
  };

  return (
    <div className={Styles.addImages}>
      <Title className={Styles.addImages__title} size='sm' weight='semiBold'>
        {translations[lang].dashboard_page.image_goods}
      </Title>

      <Reorder.Group
        className={Styles.addImages__images}
        axis='x'
        values={images}
        onReorder={onReorder}
      >
        {[...images, ...Array(4 - images.length)].map((img, index) => (
          <React.Fragment key={img ? img.url : `placeholder-${index}`}>
            {img ? (
              <Reorder.Item
                key={img ? img.url : `placeholder-${index}`}
                value={img}
              >
                <ImageItem
                  img={img}
                  index={index}
                  handleRotateImage={handleRotateImage}
                  handleRemoveImage={handleRemoveImage}
                />
              </Reorder.Item>
            ) : index === images.length ? (
              <div className={Styles.addImages__images_placeholder}>
                <ImageUploadButton
                  handleImageUpload={handleImageUpload}
                  setIsUploading={setIsUploading}
                />
              </div>
            ) : (
              <div className={Styles.addImages__images_placeholder}>
                <Image
                  src={'/img/upload-image.png'}
                  alt='icon'
                  width={80}
                  height={80}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </Reorder.Group>

      <div className={Styles.addImages__warning}>
        <InfoIconWithHint
          text={translations[lang].dashboard_page.images_warning_message}
        />
      </div>
    </div>
  );
};

export default AddImages;
