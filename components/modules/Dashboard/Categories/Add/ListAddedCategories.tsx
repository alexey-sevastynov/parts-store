import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import { ICategory } from '@/types/category';
import {
  deleteSelectedCategories,
  updateCategoryNameById,
} from '@/actions/categoryActions';

import CategoriesTableEdit from '../CategoriesTableEdit';
import { GrUpdate } from 'react-icons/gr';
import CategoriesList from '../CategoriesList';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BREAKPOINTS } from '@/constants/breakpoints';
import NotFoundMsg from '../../NotFoundMsg';

const ListAddedCategories = ({
  data,
  updateData,
  isLoading,
}: {
  data: ICategory[];
  updateData?: () => void;
  isLoading?: boolean;
}) => {
  const { lang, translations } = useLang();
  const isMedia1200 = useMediaQuery(BREAKPOINTS.xl);

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleDelete = async () => {
    if (data) {
      try {
        const selectedCategories = data.filter(
          (category) =>
            category._id && checkboxes[category._id] && category._id !== 'all'
        );
        const selectedCategoriesIds = selectedCategories.map(
          (category) => category._id as string
        );
        const selectedSubcategoriesUrl = selectedCategories.map(
          (category) => category.imageUrl
        );

        const res = await deleteSelectedCategories(selectedCategoriesIds);

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

          updateData();
        }

        if (!fetchRes.ok) {
          console.error('Failed to delete categories:', fetchResult);
        }
      } catch (error) {
        console.error('Failed to delete selected characteristics:', error);
      }
    } else {
      console.error('List of categories is empty');
    }
  };

  React.useEffect(() => {
    updateData();
  }, []);

  const handleEditSubmit = async (
    id: string,
    updatedData: { ua: string; ru: string; en: string },
    imageUrl?: string
  ) => {
    try {
      await updateCategoryNameById(id, updatedData, imageUrl);

      updateData();
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

        <button onClick={updateData}>
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
          handleEditSubmit={handleEditSubmit}
        />
      )}

      {data && isMedia1200 && (
        <CategoriesList
          data={data}
          updateListData={updateData}
          isLoading={false}
          handleDelete={handleDelete}
          handleEditSubmit={handleEditSubmit}
          selectedCheckboxes={checkboxes}
          setSelectedCheckboxes={setCheckboxes}
        />
      )}

      {/* if not categories found in the list and is not loading */}
      {!isLoading && data && data.length === 0 && (
        <tr>
          <td>
            <NotFoundMsg
              message={translations[lang].dashboard_page.not_categories}
            />
          </td>
        </tr>
      )}
    </div>
  );
};

export default ListAddedCategories;
