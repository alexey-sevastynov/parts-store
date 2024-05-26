import { Button } from '@/components/elements/Button';
import { COLORS } from '@/constants/colors';
import { ROUTES, SIZE_ICON, SIZE_ICON_BIG } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { ILanguageStrings } from '@/types/constants';

import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaStreetView } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdDelete, MdDownloadDone } from 'react-icons/md';
import { PiTreeViewFill } from 'react-icons/pi';
import { Oval } from 'react-loader-spinner';

import { UploadFileResponse } from '@/types/uploathing-image/client';
import { UploadButton } from '@/utils/uploadthing';

const CategoryItem = ({
  isChecked,
  handleCheckboxChange,
  handleDelete,
  name,
  imageUrl,
  description,
  _id,
  idCategory,
  handleEditSubmit,
}: {
  isChecked: boolean;
  handleCheckboxChange: (item: string) => void;
  handleDelete: (item: string) => void;
  name: ILanguageStrings;
  imageUrl: string;
  description?: string;
  _id?: string;
  idCategory?: string;
  handleEditSubmit: (
    id: string,
    updatedData: { ua: string; ru: string; en: string; description?: string },
    imageUrl?: string
  ) => Promise<void>;
}) => {
  if (!name || !_id) {
    console.error('Invalid category object:', name, _id);
    return null;
  }
  const { lang, translations } = useLang();

  const [isActiveEdit, setIsActiveEdit] = React.useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = React.useState<boolean>(false);
  const [isImageChanged, setIsImageChanged] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [uaName, setUaName] = React.useState(name.ua);
  const [ruName, setRuName] = React.useState(name.ru);
  const [enName, setEnName] = React.useState(name.en);
  const [currentImageUrl, setCurrentImageUrl] = React.useState(imageUrl);
  const [image, setImage] = React.useState<UploadFileResponse[]>([]);

  const [descriptionValue, setDescriptionValue] = React.useState(description);

  const handleDeleteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Prevent checkbox toggle when delete button is clicked
    if (_id) handleDelete(_id);
  };

  const handleInputChange = (newValue: string, oldValue: string) => {
    if (newValue !== oldValue) {
      setIsValueChanged(true);
    } else {
      setIsValueChanged(false);
    }
  };
  const handleUaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUaName(value);
    handleInputChange(value, name.ua);
  };

  const handleRuChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setRuName(value);
    handleInputChange(value, name.ru);
  };

  const handleEnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setEnName(value);
    handleInputChange(value, name.en);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDescriptionValue(value);

    handleInputChange(value, description as string);
  };

  const handleCancelEdit = () => {
    setIsActiveEdit(false);
    setIsValueChanged(false);
    setIsImageChanged(false); // Reset image change state

    setUaName(name.ua);
    setRuName(name.ru);
    setEnName(name.en);
    setCurrentImageUrl(imageUrl); // Reset the image URL to the original
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsActiveEdit(true);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (uaName && ruName && enName && _id && (isImageChanged || imageUrl)) {
      try {
        if (descriptionValue) {
          await handleEditSubmit(
            _id,
            {
              ua: uaName,
              ru: ruName,
              en: enName,
              description: descriptionValue,
            },
            isImageChanged ? image[0].url : currentImageUrl
          );
        } else {
          await handleEditSubmit(
            _id,
            { ua: uaName, ru: ruName, en: enName },
            isImageChanged ? image[0].url : currentImageUrl
          );
        }

        setIsSubmitting(false);
        setIsActiveEdit(false);
        setIsImageChanged(false); // Reset image change state after submit
      } catch (error) {
        console.error('Failed to update characteristic value:', error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <li
      className={`${Styles.categoriesItem} ${isChecked && Styles.activeSelect}`}
    >
      <div className={Styles.categoriesItem__select}>
        {isChecked && (
          <button
            className={Styles.categoriesItem__select_delete}
            onClick={handleDeleteButtonClick}
          >
            {translations[lang].dashboard_page.delete_selected_users}
          </button>
        )}

        <input
          className={Styles.categoriesItem__select_checkboxs}
          name={_id}
          checked={isChecked}
          onChange={() => handleCheckboxChange(_id as string)}
          type='checkbox'
        />
      </div>

      <div className={Styles.categoriesItem__photo}>
        {isActiveEdit ? (
          <>
            <Image
              src={image[0]?.url || currentImageUrl || '/img/no-image.png'}
              alt='image'
              width={200}
              height={200}
            />
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
                    return <p>{translations[lang].uploadthing.upload_icon}</p>;

                  return <p>{translations[lang].uploadthing.uploading}</p>;
                },
                allowedContent({ ready, fileTypes, isUploading }) {
                  if (!ready)
                    return translations[lang].uploadthing
                      .checking_what_you_allow;
                  if (isUploading)
                    return translations[lang].uploadthing.image_is_uploading;
                  return translations[lang].uploadthing.max_file_image;
                },
              }}
              onClientUploadComplete={async (res) => {
                try {
                  const json = JSON.stringify({ url: currentImageUrl });
                  const _res = await fetch('/api/uploadthing', {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: json,
                  });

                  if (!_res.ok) {
                    const errorText = await _res.text();
                    throw new Error(`Error deleting file: ${errorText}`);
                  }

                  setImage(res as any);
                  setCurrentImageUrl(res[0].url);
                  setIsImageChanged(true);
                } catch (error) {
                  console.error('Failed to delete file:', error);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </>
        ) : (
          <Image src={imageUrl} alt='' width={200} height={200} />
        )}
      </div>

      {/* name ukrainian */}
      <div className={Styles.categoriesItem__description}>
        <p className={Styles.categoriesItem__description_key}>
          {translations[lang].dashboard_page.name_ua}
        </p>

        {isActiveEdit ? (
          <form
            onSubmit={handleFormSubmit}
            className={Styles.categoriesItem__description_form}
          >
            <input value={uaName} onChange={handleUaChange} />
          </form>
        ) : (
          <p className={Styles.categoriesItem__description_value}>{name.ua}</p>
        )}

        <span className={Styles.categoriesItem__description_line} />
      </div>

      {/* name russian */}
      <div className={Styles.categoriesItem__description}>
        <p className={Styles.categoriesItem__description_key}>
          {translations[lang].dashboard_page.name_ru}
        </p>

        {isActiveEdit ? (
          <form
            onSubmit={handleFormSubmit}
            className={Styles.categoriesItem__description_form}
          >
            <input value={ruName} onChange={handleRuChange} />
          </form>
        ) : (
          <p className={Styles.categoriesItem__description_value}>{name.ru}</p>
        )}

        <span className={Styles.categoriesItem__description_line} />
      </div>

      {/* name english */}
      <div className={Styles.categoriesItem__description}>
        <p className={Styles.categoriesItem__description_key}>
          {translations[lang].dashboard_page.name_en}
        </p>

        {isActiveEdit ? (
          <form
            onSubmit={handleFormSubmit}
            className={Styles.categoriesItem__description_form}
          >
            <input value={enName} onChange={handleEnChange} />
          </form>
        ) : (
          <p className={Styles.categoriesItem__description_value}>{name.en}</p>
        )}

        <span className={Styles.categoriesItem__description_line} />
      </div>

      {/* description */}
      {description && (
        <div className={Styles.categoriesItem__descriptionValue}>
          <span className={Styles.categoriesItem__descriptionValue_key}>
            {translations[lang].common.description}:
          </span>

          {isActiveEdit ? (
            <form
              onSubmit={handleFormSubmit}
              className={Styles.categoriesItem__descriptionValue_form}
            >
              <input
                value={descriptionValue}
                onChange={handleDescriptionChange}
              />
            </form>
          ) : (
            <span className={Styles.categoriesItem__descriptionValue_value}>
              {description}
            </span>
          )}

          <span className={Styles.categoriesItem__descriptionValue_line} />
        </div>
      )}

      <div className={Styles.categoriesItem__btns}>
        <div className={Styles.categoriesItem_btns_link}>
          {_id && (
            <Link
              href={
                idCategory
                  ? ROUTES.VIEW_SUB_SUBCATEGORIES_ADD_BY_ID(idCategory, _id)
                  : ROUTES.VIEW_SUBCATEGORIES_ADD(_id)
              }
            >
              <Button
                className={Styles.categoriesItem__btns_link_bnt}
                title={translations[lang].dashboard_page.sub_categories}
                colotButton='orange'
                disabled={!!descriptionValue}
              >
                <PiTreeViewFill size={SIZE_ICON} />
              </Button>
            </Link>
          )}
        </div>

        <div className={Styles.categoriesItem__btns_edit}>
          {isActiveEdit ? (
            // _______ if edit buttons are active __________

            <form
              onSubmit={handleFormSubmit}
              className={Styles.categoriesItem__btns_edit}
            >
              <Button
                className={Styles.categoriesItem__btns_edit_bnt}
                disabled={(!isValueChanged && !isImageChanged) || isSubmitting}
                type='submit'
                title={translations[lang].common.save}
              >
                {isSubmitting ? (
                  <Oval
                    visible={true}
                    height={SIZE_ICON}
                    width={SIZE_ICON}
                    color={COLORS.whiteFont}
                    secondaryColor={COLORS.whiteFont}
                    ariaLabel='oval-loading'
                  />
                ) : (
                  <MdDownloadDone size={SIZE_ICON} />
                )}
              </Button>
              <Button
                className={Styles.categoriesItem__btns_edit_bnt}
                type='button'
                onClick={handleCancelEdit}
                title={translations[lang].common.cancel}
                colotButton='red'
              >
                <IoMdClose size={SIZE_ICON} />
              </Button>
            </form>
          ) : (
            // _______ if edit buttons are not active __________
            <Button
              className={Styles.categoriesItem__body_button_block_btns_edit_btn}
              type='button'
              onClick={handleEdit}
              title={translations[lang].common.edit}
            >
              <AiFillEdit size={SIZE_ICON} />
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default CategoryItem;
