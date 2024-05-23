import Styles from '@/styles/modules/dashboard/index.module.scss';

import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import Link from 'next/link';

import { COLORS } from '@/constants/colors';
import { AllowedLangs } from '@/constants/lang';
import { ROUTES, SIZE_ICON, SIZE_ICON_BIG } from '@/constants/common';

import { motion } from 'framer-motion';
import { deleteItemsTableMotion } from '@/constants/motion';
import { ICategory, ISubSubcategory, ISubcategory } from '@/types/category';

import SvgIconUrl from '@/components/elements/SvgIconUrl';
import { Button } from '@/components/elements/Button';
import { Oval } from 'react-loader-spinner';
import { useLang } from '@/hooks/useLang';
import {
  getCategoryById,
  getSubcategoryById,
  updateCategoryNameById,
  updateSubcategoryNameById,
} from '@/actions/categoryActions';
import { PiTreeViewFill } from 'react-icons/pi';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { MdDownloadDone } from 'react-icons/md';

interface ICategoryRowEditProps {
  data: ICategory | ISubcategory;
  isChecked: boolean;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  lang: AllowedLangs;
  idCategory?: string;
  handleEditSubmit: (
    id: string,
    updatedData: { ua: string; ru: string; en: string }
  ) => Promise<void>;
}

const CategoryRowEdit: React.FC<ICategoryRowEditProps> = ({
  data,
  isChecked,
  handleCheckboxChange,
  lang,
  idCategory,
  handleEditSubmit,
}) => {
  if (!data || !data._id) {
    console.error('Invalid category object:', data);
    return null;
  }

  const { name, _id, imageUrl } = data;

  const { translations } = useLang();

  const [isActiveEdit, setIsActiveEdit] = React.useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [uaName, setUaName] = React.useState(name.ua);
  const [ruName, setRuName] = React.useState(name.ru);
  const [enName, setEnName] = React.useState(name.en);

  const updateName = async (id: string): Promise<void> => {
    // Retrieve the category or subcategory object based on the provided id
    const categoryOrSubcategory = idCategory
      ? (await getSubcategoryById(id)).subcategory
      : (await getCategoryById(id)).category;

    // Extract the name property from the category or subcategory object
    const { name = { ua: '', ru: '', en: '' } } = categoryOrSubcategory || {};

    // Update the name state variables
    setUaName(name.ua);
    setRuName(name.ru);
    setEnName(name.en);
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

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsActiveEdit(true);
  };

  const handleCancelEdit = () => {
    setIsActiveEdit(false);
    setIsValueChanged(false);

    setUaName(name.ua);
    setRuName(name.ru);
    setEnName(name.en);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (uaName && ruName && enName && _id) {
      try {
        await handleEditSubmit(_id, { ua: uaName, ru: ruName, en: enName });

        setIsSubmitting(false);

        setIsActiveEdit(false);
      } catch (error) {
        console.error('Failed to update characteristic value:', error);
        setIsSubmitting(false);
      }
    } else {
      console.log('One or more required values are missing');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (uaName && ruName && enName && _id) {
      try {
        if (idCategory) {
          await updateSubcategoryNameById(_id, {
            ua: uaName,
            ru: ruName,
            en: enName,
          });
        } else
          await updateCategoryNameById(_id, {
            ua: uaName,
            ru: ruName,
            en: enName,
          });

        updateName(_id);

        // getUsers();

        setIsSubmitting(false);
        setIsActiveEdit(false);
      } catch (error) {
        console.error('Failed to update characteristic value:', error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.tr
      key={data._id}
      className={Styles.categoriesTableEdit__body}
      style={isChecked ? { backgroundColor: COLORS.grey } : {}}
      {...deleteItemsTableMotion}
    >
      {/* checkbox */}
      <td
        className={`${Styles.categoriesTableEdit__body_checkbox} ${
          isChecked && Styles.select
        }`}
      >
        <input
          type='checkbox'
          name={data._id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>

      {/* icon */}
      <td>
        {idCategory ? (
          <Image
            src={data.imageUrl}
            alt={data.name[lang]}
            width={SIZE_ICON_BIG}
            height={SIZE_ICON_BIG}
          />
        ) : (
          <SvgIconUrl
            className={`${Styles.categoriesTableEdit__body_icon} ${isChecked && Styles.white_icon}`}
            imageUrl={data.imageUrl}
            alt={data.name[lang]}
            size={SIZE_ICON_BIG}
          />
        )}
      </td>

      {/* name category ukrainian*/}
      <td className={Styles.categoriesTableEdit__body_name_category}>
        {isActiveEdit ? (
          <form onSubmit={handleFormSubmit}>
            <input value={uaName} onChange={handleUaChange} />
          </form>
        ) : (
          uaName
        )}
      </td>

      {/* name category russian*/}
      <td className={Styles.categoriesTableEdit__body_name_category}>
        {isActiveEdit ? (
          <form onSubmit={handleFormSubmit}>
            <input value={ruName} onChange={handleRuChange} />
          </form>
        ) : (
          ruName
        )}
      </td>

      {/* name category english*/}
      <td className={Styles.categoriesTableEdit__body_name_category}>
        {isActiveEdit ? (
          <form onSubmit={handleFormSubmit}>
            <input value={enName} onChange={handleEnChange} />
          </form>
        ) : (
          enName
        )}
      </td>

      {/* btn edit */}
      <td className={Styles.categoriesTableEdit__body_button_block}>
        {isActiveEdit ? (
          // _______ if edit buttons
          <form
            onSubmit={handleFormSubmit}
            className={Styles.categoriesTableEdit__body_button_block_btns}
          >
            <Button
              className={Styles.categoriesTableEdit__body_button_block_btns_bnt}
              disabled={!isValueChanged || isSubmitting}
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
              className={Styles.categoriesTableEdit__body_button_block_btns_btn}
              type='button'
              onClick={handleCancelEdit}
              title={translations[lang].common.cancel}
              colotButton='red'
            >
              <IoMdClose size={SIZE_ICON} />
            </Button>
          </form>
        ) : (
          // _______ if NOT edit button
          <div className={Styles.categoriesTableEdit__body_button_block_btns}>
            <Button
              className={Styles.categoriesTableEdit__body_button_block_btns_btn}
              type='button'
              onClick={handleEdit}
              title={translations[lang].common.edit}
            >
              <AiFillEdit size={SIZE_ICON} />
            </Button>

            <Link
              href={
                idCategory
                  ? ROUTES.VIEW_SUB_SUBCATEGORIES_ADD_BY_ID(idCategory, _id)
                  : ROUTES.VIEW_SUBCATEGORIES_ADD(_id)
              }
            >
              <Button
                className={
                  Styles.categoriesTableEdit__body_button_block_btns_link
                }
                title={translations[lang].dashboard_page.sub_categories}
                colotButton='orange'
              >
                <PiTreeViewFill size={SIZE_ICON} />
              </Button>
            </Link>
          </div>
        )}
      </td>
    </motion.tr>
  );
};

export default CategoryRowEdit;
