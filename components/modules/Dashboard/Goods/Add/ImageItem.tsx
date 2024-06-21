import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Image from 'next/image';

import { AiOutlineRotateRight } from 'react-icons/ai';
import { MdRemoveCircleOutline } from 'react-icons/md';

import { UploadFileResponse } from '@/types/uploathing-image/client';

import { COLORS } from '@/constants/colors';
import { SIZE_ICON } from '@/constants/common';

interface ImageItemProps {
  img: string;
  index: number;
  handleRotateImage: (index: number) => void;
  handleRemoveImage: (img: UploadFileResponse, index: number) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({
  img,
  index,
  handleRotateImage,
  handleRemoveImage,
}) => {
  return (
    <div className={Styles.addImages__images_item}>
      <div className={Styles.addImages__images_item_image}>
        <Image
          src={img}
          alt='image'
          width={200}
          height={200}
          style={{ objectFit: 'cover' }}
        />
        <div className={Styles.addImages__images_item_image_btns_wrap}>
          <div className={Styles.addImages__images_item_image_btns}>
            <button
              className={Styles.addImages__images_item_image_btns_rotate}
              onClick={() => handleRotateImage(index)}
              type='button'
            >
              <AiOutlineRotateRight size={SIZE_ICON} color={COLORS.blackIcon} />
            </button>
            <button
              className={Styles.addImages__images_item_image_btns_remove}
              onClick={() => handleRemoveImage(img, index)}
              type='button'
            >
              <MdRemoveCircleOutline
                size={SIZE_ICON}
                color={COLORS.blackIcon}
              />
            </button>
          </div>
        </div>

        {index === 0 && (
          <div className={Styles.addImages__images_item_image_first}>
            <p>First image</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageItem;
