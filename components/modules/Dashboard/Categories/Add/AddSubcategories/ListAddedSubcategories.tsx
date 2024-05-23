import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import { ISubcategory } from '@/types/category';

import CategoriesTableEdit from '../../CategoriesTableEdit';
import {
  deleteSelectedSubcategories,
  updateSubcategoryNameById,
} from '@/actions/categoryActions';

import { BREAKPOINTS } from '@/constants/breakpoints';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CategoriesList from '../../CategoriesList';
import { GrUpdate } from 'react-icons/gr';

const ListAddedSubcategories = ({
  data,
  idCategory,
  updateListSubcategories,
}: {
  data: ISubcategory[];
  idCategory?: string;
  updateListSubcategories: () => Promise<void>;
}) => {
  const { lang, translations } = useLang();
  const isMedia1200 = useMediaQuery(BREAKPOINTS.xl);

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleDelete = async () => {
    try {
      const selectedSubcategories = data.filter(
        (subcategory) =>
          subcategory._id &&
          checkboxes[subcategory._id] &&
          subcategory._id !== 'all'
      );
      const selectedSubcategoriesIds = selectedSubcategories.map(
        (category) => category._id as string
      );
      const selectedSubcategoriesUrl = selectedSubcategories.map(
        (category) => category.imageUrl
      );

      const res = await deleteSelectedSubcategories(selectedSubcategoriesIds);

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
        setCheckboxes({});

        updateListSubcategories();
      }

      if (!fetchRes.ok) {
        console.error('Failed to delete categories:', fetchResult);
      }
    } catch (error) {
      console.error('Failed to delete selected characteristics:', error);
    }
  };

  const handleEditSubmit = async (
    id: string,
    updatedData: { ua: string; ru: string; en: string }
  ) => {
    try {
      await updateSubcategoryNameById(id, updatedData);

      updateListSubcategories();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return (
    <div className={Styles.listAddedCategories}>
      <div className={Styles.listAddedCategories__title}>
        <Title size='sm'>
          {translations[lang].dashboard_page.list_added_categories}
        </Title>

        <button onClick={updateListSubcategories}>
          <GrUpdate title={translations[lang].common.update} />
        </button>
      </div>

      {data && !isMedia1200 && (
        <CategoriesTableEdit
          values={data}
          isLoading={false}
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
          onDeleteSelected={handleDelete}
          idCategory={idCategory}
          handleEditSubmit={handleEditSubmit}
        />
      )}

      {data && isMedia1200 && (
        <CategoriesList
          data={data}
          updateListData={updateListSubcategories}
          isLoading={false}
          handleDelete={handleDelete}
          handleEditSubmit={handleEditSubmit}
          selectedCheckboxes={checkboxes}
          setSelectedCheckboxes={setCheckboxes}
          idCategory={idCategory}
        />
      )}
    </div>
  );
};

export default ListAddedSubcategories;
