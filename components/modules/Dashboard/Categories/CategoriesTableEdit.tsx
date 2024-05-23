import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';

import { useLang } from '@/hooks/useLang';

import { ICategoriesTableEditProps } from '@/types/dashboard';

import { handleCheckboxChange } from '@/utils/dashboards';

// import CharacteristicRowLoader from './CharacteristicRowLoader';
import CategoryRowEdit from './CategoryRowEdit';

const CategoriesTableEdit = ({
  values,
  isLoading,
  onDeleteSelected,
  checkboxes,
  setCheckboxes,
  idCategory,
  handleEditSubmit,
}: ICategoriesTableEditProps) => {
  const { lang, translations } = useLang();

  const isAnyCheckboxChecked = Object.values(checkboxes).some(
    (value) => value === true
  );

  const handleBackButtonClick = () => {
    // Set the state of all checkboxes to false
    const updatedCheckboxes = { ...checkboxes };
    Object.keys(updatedCheckboxes).forEach((key) => {
      updatedCheckboxes[key] = false;
    });

    setCheckboxes(updatedCheckboxes);
  };

  return (
    <table className={Styles.categoriesTableEdit}>
      <thead>
        <tr className={Styles.categoriesTableEdit__head}>
          {/* checkbox ALL */}
          <th className={Styles.categoriesTableEdit__head_checkbox}>
            <input
              type='checkbox'
              name='all'
              checked={checkboxes['all'] || false}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(
                  values,
                  event,
                  checkboxes,
                  setCheckboxes,
                  isAnyCheckboxChecked
                )
              }
              disabled={!values}
            />
          </th>

          {/* icon */}
          <th className={Styles.categoriesTable__head_icon}>
            <p>{translations[lang].common.icon}</p>
          </th>

          {/* value ua*/}
          <th className={Styles.categoriesTableEdit__head_name_category}>
            <p>{translations[lang].dashboard_page.value_ua}</p>
          </th>

          {/* value ru*/}
          <th className={Styles.categoriesTableEdit__head_name_category}>
            <p>{translations[lang].dashboard_page.value_ru}</p>
          </th>

          {/* value en*/}
          <th className={Styles.categoriesTableEdit__head_name_category}>
            <p>{translations[lang].dashboard_page.value_en}</p>
          </th>
        </tr>

        {/* PANEL DELETE, WHEN SELECT */}
        {isAnyCheckboxChecked && (
          <tr className={Styles.categoriesTableEdit__head_delete}>
            <th>
              <button
                className={Styles.categoriesTableEdit__head_delete_btn_red}
                onClick={onDeleteSelected}
              >
                {
                  translations[lang].dashboard_page
                    .delete_selected_characteristic
                }
              </button>
            </th>

            <th>
              <button
                className={Styles.categoriesTableEdit__head_delete_btn}
                onClick={handleBackButtonClick}
              >
                {translations[lang].common.cancel}
              </button>
            </th>
          </tr>
        )}

        {/* line */}
        <tr className={Styles.categoriesTableEdit__head_line}>
          <td />
        </tr>
      </thead>
      <tbody>
        {/* {!isLoading && (!categories || categories.length === 0) && (
          <NotFoundMsg
            message={
              translations[lang].dashboard_page.not_found_categories
            }
          />
        )} */}

        {isLoading
          ? [...Array(10)].map((_, id) => <div key={id} />)
          : values
              .slice()
              .reverse()
              .map((value) => (
                <CategoryRowEdit
                  key={value._id}
                  data={value}
                  isChecked={!!checkboxes[value._id as string]}
                  handleCheckboxChange={(
                    event: ChangeEvent<HTMLInputElement>
                  ) =>
                    handleCheckboxChange(
                      values,
                      event,
                      checkboxes,
                      setCheckboxes,
                      isAnyCheckboxChecked
                    )
                  }
                  lang={lang}
                  idCategory={idCategory}
                  handleEditSubmit={handleEditSubmit} //
                />
              ))}
      </tbody>
    </table>
  );
};

export default CategoriesTableEdit;
