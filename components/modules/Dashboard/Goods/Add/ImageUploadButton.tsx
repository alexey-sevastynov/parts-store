import React from 'react';
import { UploadButton } from '@/utils/uploadthing';
import { COLORS } from '@/constants/colors';
import { useLang } from '@/hooks/useLang';

import { UploadFileResponse } from '@/types/uploathing-image/client';

interface ImageUploadButtonProps {
  handleImageUpload: (newImages: UploadFileResponse[]) => void;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  handleImageUpload,
  setIsUploading,
}) => {
  const { lang, translations } = useLang();

  return (
    <UploadButton
      endpoint='imageUploader'
      appearance={{
        button({ ready, isUploading }) {
          return {
            color: COLORS.whiteFont,

            textAlign: 'center',
            backgroundColor: isUploading
              ? COLORS.red
              : ready
                ? COLORS.green
                : undefined,
          };
        },
        allowedContent: {
          color: COLORS.grey,
        },
      }}
      content={{
        button({ ready }) {
          return (
            <p>
              {ready
                ? translations[lang].uploadthing.add_image ||
                  translations[lang].uploadthing.upload_icon
                : translations[lang].uploadthing.uploading}
            </p>
          );
        },
        allowedContent({ ready, fileTypes, isUploading }) {
          if (!ready)
            return translations[lang].uploadthing.checking_what_you_allow;
          if (isUploading)
            return translations[lang].uploadthing.image_is_uploading;
          return 'msgMaxSize' || translations[lang].uploadthing.max_file_image;
        },
      }}
      onClientUploadComplete={(res: any) => {
        setIsUploading(false);
        if (res) {
          handleImageUpload(res);
          console.log(JSON.stringify(res));
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={() => setIsUploading(true)}
    />
  );
};

export default ImageUploadButton;
