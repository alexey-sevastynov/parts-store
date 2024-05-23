// SubSubcategoryForm.tsx
import Styles from '@/styles/modules/dashboard/index.module.scss';

import { createSubSubcategory } from '@/actions/categoryActions';
import {
  ISubSubcategoryFormData,
  ISubSubcategoryFormProps,
} from '@/types/category';
import React from 'react';
import { useForm } from 'react-hook-form';
import UploadImage from '@/components/elements/UploadImage';
import { useLang } from '@/hooks/useLang';
import { UploadFileResponse } from 'uploadthing/client';
import { Button } from '@/components/elements/Button';
import NotificationBar from '@/components/elements/NotificationBar';
import { TypeNotificationMessage } from '@/types/elements';

const SubSubcategoryForm: React.FC<ISubSubcategoryFormProps> = ({
  subcategoryId,
  updateListData,
}) => {
  const { lang, translations } = useLang();

  const { register, handleSubmit, reset } = useForm<ISubSubcategoryFormData>();

  const [image, setImage] = React.useState<UploadFileResponse[]>([]);
  const [notification, setNotification] = React.useState<null | {
    type: TypeNotificationMessage;
    message: string;
  }>(null);

  const onSubmit = async (data: ISubSubcategoryFormData) => {
    const { nameEn, nameRu, nameUa, description } = data;

    if (nameEn && nameRu && nameUa && description && image.length) {
      try {
        const response = await createSubSubcategory(subcategoryId, {
          name: {
            en: nameEn,
            ru: nameRu,
            ua: nameUa,
          },
          imageUrl: image[0].url,
          description: description || '',
        });
        if (response.status === 200) {
          showNotification(
            'success',
            `${translations[lang].common.success_fetch}: "${response.msg}"`
          );

          reset();
          setImage([]);
          updateListData();
        } else {
          showNotification(
            'error',
            `${translations[lang].common.error_fetch}: ${response.msg}`
          );
        }
      } catch (error: any) {
        console.error(error);
        showNotification(
          'error',
          `${translations[lang].common.error_fetch}: ${error.message}`
        );
      }
    } else {
      showNotification(
        'warning',
        `${translations[lang].common.fill_all_fields}`
      );
    }
  };

  const showNotification = (type: TypeNotificationMessage, message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null); // Here we set null to hide the notification
    }, 3000);
  };

  return (
    <>
      <form className={Styles.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <UploadImage
          className={Styles.categoryForm__image}
          image={image}
          setImage={setImage}
          msgMaxSize={translations[lang].uploadthing.max_file_png}
          buttonText={translations[lang].uploadthing.upload_image}
        />

        <div className={Styles.categoryForm__main}>
          <div className={Styles.categoryForm__main_inputs}>
            {/* ukrainian text */}
            <div className={Styles.categoryForm__main_inputs_input}>
              <label htmlFor='nameUa'>
                {translations[lang].dashboard_page.name_ua}
              </label>
              <input type='text' id='nameUa' {...register('nameUa')} />
            </div>

            {/* russian text */}
            <div className={Styles.categoryForm__main_inputs_input}>
              <label htmlFor='nameRu'>
                {translations[lang].dashboard_page.name_ru}
              </label>
              <input type='text' id='nameRu' {...register('nameRu')} />
            </div>

            {/* english text */}
            <div className={Styles.categoryForm__main_inputs_input}>
              <label htmlFor='nameEn'>
                {translations[lang].dashboard_page.name_en}
              </label>
              <input type='text' id='nameEn' {...register('nameEn')} />
            </div>

            {/* description text */}
            <div className={Styles.categoryForm__main_inputs_input}>
              <label htmlFor='description'>
                {translations[lang].common.description}
              </label>
              <input
                type='text'
                id='description'
                {...register('description')}
              />
            </div>
          </div>

          <div className={Styles.categoryForm__main_submit}>
            <Button type='submit'>{translations[lang].common.add}</Button>
          </div>
        </div>
      </form>

      {notification && (
        <div className={Styles.notification}>
          <NotificationBar type={notification.type}>
            {notification.message}
          </NotificationBar>
        </div>
      )}
    </>
  );
};

export default SubSubcategoryForm;
