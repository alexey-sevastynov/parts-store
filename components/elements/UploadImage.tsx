'use client';
import Styles from '@/styles/elements/index.module.scss';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import { SIZE_ICON_BIG } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import { UploadButton } from '@/utils/uploadthing';
import { COLORS } from '@/constants/colors';
import { RotatingLines } from 'react-loader-spinner';
import { UploadFileResponse } from '@/types/uploathing-image/client';

export interface IUploadImageProps extends HTMLAttributes<HTMLDivElement> {
  image?: UploadFileResponse[];
  setImage?: (images: UploadFileResponse[]) => void;
  buttonText?: string;
  msgMaxSize?: string;
}

const UploadImage = ({
  image = [],
  setImage = () => {},
  buttonText,
  msgMaxSize,
  ...props
}: IUploadImageProps) => {
  const { lang, translations } = useLang();

  const [isCurrentlyUploading, setIsCurrentlyUploading] = React.useState(false);

  return (
    <div className={Styles.uploadImage} {...props}>
      <div className={Styles.uploadImage__header}>
        {isCurrentlyUploading ? (
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
            allowedContent({ ready, isUploading }) {
              if (!ready)
                return translations[lang].uploadthing.checking_what_you_allow;
              if (isUploading)
                return translations[lang].uploadthing.image_is_uploading;
              return (
                msgMaxSize || translations[lang].uploadthing.max_file_image
              );
            },
          }}
          onClientUploadComplete={(res) => {
            setIsCurrentlyUploading(false);
            if (res) {
              setImage(res);
              JSON.stringify(res);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          onUploadBegin={() => setIsCurrentlyUploading(true)}
        />
      </div>
    </div>
  );
};

export default UploadImage;
