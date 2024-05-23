'use client';
import Styles from '@/styles/elements/index.module.scss';

import { SIZE_ICON, SIZE_ICON_BIG } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import Image from 'next/image';
import Paragraph from './Paragraph';
import React, { HTMLAttributes } from 'react';
import '@uploadthing/react/styles.css';

import Link from 'next/link';
import { UploadButton } from '@/utils/uploadthing';
import { COLORS } from '@/constants/colors';
import { UploadFileResponse } from 'uploadthing/client';
import { RotatingLines } from 'react-loader-spinner';

export interface IUploadImageProps extends HTMLAttributes<HTMLDivElement> {
  image: UploadFileResponse[];
  setImage: (images: UploadFileResponse[]) => void;
  buttonText?: string;
  msgMaxSize?: string;
}

const UploadImage = ({
  image,
  setImage,

  buttonText,
  msgMaxSize,
  ...props
}: IUploadImageProps) => {
  const { lang, translations } = useLang();

  const [isUploading, setIsUploading] = React.useState(false);

  return (
    <div className={Styles.uploadImage} {...props}>
      <div className={Styles.uploadImage__header}>
        {isUploading ? (
          <RotatingLines
            visible={true}
            width={SIZE_ICON_BIG.toString()}
            strokeColor={COLORS.grey}
            animationDuration='0.75'
            ariaLabel='rotating-lines-loading'
          />
        ) : (
          <Image
            src={image.length ? image[0].url : '/img/upload-image.png'}
            alt='icon'
            width={80}
            height={80}
          />
        )}
      </div>

      <div className={Styles.uploadImage__footer}>
        <UploadButton
          endpoint='imageUploader'
          appearance={{
            button({ ready, isUploading }) {
              return {
                color: COLORS.whiteFont,

                ...(ready && { backgroundColor: COLORS.green }),
                ...(isUploading && { backgroundColor: COLORS.red }),
              };
            },
            allowedContent: {
              color: COLORS.grey,
            },
          }}
          content={{
            button({ ready }) {
              if (ready)
                return (
                  <p>
                    {buttonText || translations[lang].uploadthing.upload_icon}
                  </p>
                );

              return <p>{translations[lang].uploadthing.uploading}</p>;
            },
            allowedContent({ ready, fileTypes, isUploading }) {
              if (!ready)
                return translations[lang].uploadthing.checking_what_you_allow;
              if (isUploading)
                return translations[lang].uploadthing.image_is_uploading;
              return (
                msgMaxSize || translations[lang].uploadthing.max_file_image
              );
            },
          }}
          onClientUploadComplete={(res: any) => {
            setIsUploading(false);
            if (res) {
              setImage(res);
              const json = JSON.stringify(res);

              console.log(json);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          onUploadBegin={() => setIsUploading(true)}
        />
      </div>
    </div>
  );
};

export default UploadImage;
