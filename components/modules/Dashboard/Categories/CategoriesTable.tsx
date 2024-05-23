import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';
import { useLang } from '@/hooks/useLang';
import { BiSort } from 'react-icons/bi';
import { ICategoriesTableProps } from '@/types/dashboard';
import CategoryRowLoader from './CategoryRowLoader';
import NotFoundMsg from '../NotFoundMsg';
import { handleCheckboxChange } from '@/utils/dashboards';
import { AnimatePresence } from 'framer-motion';
import CategoryRow from './CategoryRow';
import { deleteSelectedCategories } from '@/actions/categoryActions';

const CategoriesTable = ({
  categories,
  searchResultsCategory,
  isLoading,
  getCategories,
}: ICategoriesTableProps) => {
  const { lang, translations } = useLang();

  const [isSortByName, setIsSortByName] = React.useState<boolean>(false);

  const renderedCategories = isSortByName
    ? searchResultsCategory
        .slice()
        .sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
    : searchResultsCategory.slice().reverse();

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const isAnyCheckboxChecked = Object.values(checkboxes).some(
    (value) => value === true
  );

  const isEmptyCategories = categories.length === 0;
  const isEmptySearchResultsCategory = searchResultsCategory.length === 0;

  const deleteSelected = async () => {
    try {
      const selectedCategories = categories.filter(
        (category) =>
          category._id && checkboxes[category._id] && category._id !== 'all'
      );
      const selectedCategoriesIds = selectedCategories.map(
        (category) => category._id as string
      );
      const selectedCategoriesUrl = selectedCategories.map(
        (category) => category.imageUrl
      );

      const res = await deleteSelectedCategories(selectedCategoriesIds);

      const fetchRes = await fetch('/api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: selectedCategoriesUrl,
        }),
      });

      const fetchResult = await fetchRes.json();

      if (res.status === 200) {
        setCheckboxes({});

        getCategories();
      }

      if (!fetchRes.ok) {
        console.error('Failed to delete categories:', fetchResult);
      }
    } catch (error) {
      console.error('Failed to delete selected characteristics:', error);
    }
  };

  const handleBackButtonClick = () => {
    // Set the state of all checkboxes to false
    const updatedCheckboxes = { ...checkboxes };
    Object.keys(updatedCheckboxes).forEach((key) => {
      updatedCheckboxes[key] = false;
    });

    setCheckboxes(updatedCheckboxes);
  };

  const handleSortButtonClick = () => {
    setIsSortByName((prevState) => !prevState);
  };

  return (
    <table className={Styles.categoriesTable}>
      <thead>
        <tr className={Styles.categoriesTable__head}>
          {/* checkbox ALL */}
          <th className={Styles.categoriesTable__head_checkbox}>
            <input
              type='checkbox'
              name='all'
              checked={checkboxes['all'] || false}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(
                  categories,
                  event,
                  checkboxes,
                  setCheckboxes,
                  isAnyCheckboxChecked
                )
              }
              disabled={
                !categories || isEmptySearchResultsCategory || isEmptyCategories
              }
            />
          </th>

          {/* icon */}
          <th className={Styles.categoriesTable__head_icon}>
            <p>{translations[lang].common.icon}</p>
          </th>

          {/* name */}
          <th className={Styles.categoriesTable__head_name_category}>
            <button
              className={isSortByName ? Styles.btn_active : Styles.btn}
              title={translations[lang].dashboard_page.sort_by_alphabet}
              onClick={handleSortButtonClick}
            >
              <p>{translations[lang].dashboard_page.name_category}</p>
              <BiSort />
            </button>
          </th>

          {/* list categories */}
          <th className={Styles.categoriesTable__head_list_categories}>
            {translations[lang].dashboard_page.list_categories}
          </th>
        </tr>

        {/* PANEL DELETE, WHEN SELECT */}
        {isAnyCheckboxChecked && (
          <tr className={Styles.categoriesTable__head_delete}>
            <th>
              <button
                className={Styles.categoriesTable__head_delete_btn_red}
                onClick={deleteSelected}
              >
                {translations[lang].dashboard_page.delete_selected_categories}
              </button>
            </th>

            <th>
              <button
                className={Styles.categoriesTable__head_delete_btn}
                onClick={handleBackButtonClick}
              >
                {translations[lang].common.cancel}
              </button>
            </th>
          </tr>
        )}

        {/* line */}
        <tr className={Styles.categoriesTable__head_line}>
          <td />
        </tr>
      </thead>

      <tbody>
        {isLoading &&
          // Loader Display
          [...Array(10)].map((_, id) => <CategoryRowLoader key={id} />)}

        {/* Checking the availability of categories */}
        {!isLoading && categories && categories.length === 0 && (
          <tr>
            <td>
              <NotFoundMsg
                message={translations[lang].dashboard_page.not_categories}
              />
            </td>
          </tr>
        )}

        {/* Checking search results */}
        {!isLoading &&
          searchResultsCategory &&
          isEmptySearchResultsCategory &&
          !isEmptyCategories && (
            <tr>
              <td>
                <NotFoundMsg
                  message={
                    translations[lang].dashboard_page.not_found_categories
                  }
                />
              </td>
            </tr>
          )}

        {/* Display of categories */}
        <AnimatePresence initial={false}>
          {!isLoading &&
            searchResultsCategory &&
            !isEmptySearchResultsCategory &&
            renderedCategories.map((category) => (
              <CategoryRow
                key={category._id}
                category={category}
                isChecked={!!checkboxes[category._id as string]}
                handleCheckboxChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(
                    categories,
                    event,
                    checkboxes,
                    setCheckboxes,
                    isAnyCheckboxChecked
                  )
                }
                lang={lang}
              />
            ))}
        </AnimatePresence>
      </tbody>
    </table>
  );
};

export default CategoriesTable;
