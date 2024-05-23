// SubcategoryForm.tsx
import Styles from '@/styles/modules/dashboard/index.module.scss';

import { createSubcategory } from '@/actions/categoryActions';
import UploadImage from '@/components/elements/UploadImage';
import { ISubcategoryFormData, ISubcategoryFormProps } from '@/types/category';

import React from 'react';
import { useForm } from 'react-hook-form';
import { UploadFileResponse } from 'uploadthing/client';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/elements/Button';
import NotificationBar from '@/components/elements/NotificationBar';
import { TypeNotificationMessage } from '@/types/elements';

const SubcategoryForm: React.FC<ISubcategoryFormProps> = ({
  categoryId,
  updateListSubcategories,
}) => {
  const { lang, translations } = useLang();

  const { register, handleSubmit, reset } = useForm<ISubcategoryFormData>();

  const [image, setImage] = React.useState<UploadFileResponse[]>([]);
  const [notification, setNotification] = React.useState<null | {
    type: TypeNotificationMessage;
    message: string;
  }>(null);

  const onSubmit = async (data: ISubcategoryFormData) => {
    const { nameEn, nameRu, nameUa } = data;

    if (nameEn && nameRu && nameUa && image.length) {
      try {
        const response = await createSubcategory(categoryId, {
          name: {
            en: nameEn,
            ru: nameRu,
            ua: nameUa,
          },
          imageUrl: image[0].url,
        });

        if (response.status === 200) {
          showNotification(
            'success',
            `${translations[lang].common.success_fetch}: "${response.msg}"`
          );

          reset();
          setImage([]);

          updateListSubcategories();
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

export default SubcategoryForm;
