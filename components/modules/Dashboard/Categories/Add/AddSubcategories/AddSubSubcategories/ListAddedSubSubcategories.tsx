import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import { ISubSubcategory, ISubcategory } from '@/types/category';

import Link from 'next/link';
import { ROUTES } from '@/constants/common';
import CategoriesTableEdit from '../../../CategoriesTableEdit';
import CategoriesList from '../../../CategoriesList';
import {
  deleteSelectedSubSubCategories,
  updateSubSubcategoryById,
  updateSubcategoryNameById,
} from '@/actions/categoryActions';
import { GrUpdate } from 'react-icons/gr';

const ListAddedSubSubcategories = ({
  data,
  idCategory,
  isLoading,
  updateListData,
}: {
  data: ISubSubcategory[];
  idCategory?: string;
  isLoading: boolean;
  updateListData: () => Promise<void>;
}) => {
  const { lang, translations } = useLang();

  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleDeleteSelectedSubSubCategories = async () => {
    try {
      const selectedSubcategories = data.filter(
        (subcategory) =>
          subcategory._id &&
          selectedCheckboxes[subcategory._id] &&
          subcategory._id !== 'all'
      );
      const selectedSubcategoriesIds = selectedSubcategories.map(
        (category) => category._id as string
      );
      const selectedSubcategoriesUrl = selectedSubcategories.map(
        (category) => category.imageUrl
      );

      const res = await deleteSelectedSubSubCategories(
        selectedSubcategoriesIds
      );

      const fetchRes = await fetch('/api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: selectedSubcategoriesUrl,
        }),
      });

      const fetchResult = await fetchRes.json();

      if (res.status === 200) {
        setSelectedCheckboxes({});
        updateListData();
      }
    } catch (error) {}

    // Clear selected checkboxes after deletion
    setSelectedCheckboxes({});
  };

  const handleEditSubmit = async (
    id: string,
    updatedData: { ua: string; ru: string; en: string; description?: string },
    imageUrl?: string
  ) => {
    try {
      await updateSubSubcategoryById(id, updatedData, imageUrl);

      updateListData();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return (
    <div className={Styles.listAddeSubSubcategories}>
      <div className={Styles.listAddedCategories__title}>
        <Title size='sm'>
          {translations[lang].dashboard_page.list_added_categories}
        </Title>

        <button onClick={updateListData}>
          <GrUpdate title={translations[lang].common.update} />
        </button>
      </div>

      <CategoriesList
        data={data}
        updateListData={updateListData}
        isLoading={isLoading}
        handleDelete={handleDeleteSelectedSubSubCategories}
        selectedCheckboxes={selectedCheckboxes}
        setSelectedCheckboxes={setSelectedCheckboxes}
        handleEditSubmit={handleEditSubmit}
        idCategory={idCategory}
      />
    </div>
  );
};

export default ListAddedSubSubcategories;
