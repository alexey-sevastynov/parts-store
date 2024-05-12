import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';

import { useLang } from '@/hooks/useLang';

import { ICharacteristicTableEditProps } from '@/types/dashboard';

import { handleCheckboxChange } from '@/utils/dashboards';

import CharacteristicRowEdit from './CharacteristicRowEdit';
import CharacteristicRowLoader from './CharacteristicRowLoader';

const CharacteristicTableEdit = ({
  values,
  isLoading,
  onDeleteSelected,
  checkboxes,
  setCheckboxes,
}: ICharacteristicTableEditProps) => {
  const { lang, translations } = useLang();

  const isCheckedAll = checkboxes['all'];

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
    <table className={Styles.charateristicTableEdit}>
      <thead>
        <tr className={Styles.charateristicTableEdit__head}>
          {/* checkbox ALL */}
          <th className={Styles.charateristicTableEdit__head_checkbox}>
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
          {/* value ua*/}
          <th
            className={Styles.charateristicTableEdit__head_name_characteristic}
          >
            <p>{translations[lang].dashboard_page.value_ua}</p>
          </th>

          {/* value ru*/}
          <th
            className={Styles.charateristicTableEdit__head_name_characteristic}
          >
            <p>{translations[lang].dashboard_page.value_ru}</p>
          </th>

          {/* value en*/}
          <th
            className={Styles.charateristicTableEdit__head_name_characteristic}
          >
            <p>{translations[lang].dashboard_page.value_en}</p>
          </th>
        </tr>

        {/* PANEL DELETE, WHEN SELECT */}
        {isAnyCheckboxChecked && (
          <tr className={Styles.charateristicTableEdit__head_delete}>
            <th>
              <button
                className={Styles.charateristicTableEdit__head_delete_btn_red}
                onClick={onDeleteSelected}
              >
                {
                  translations[lang].dashboard_page
                    .delete_selected_characteristic
                }
              </button>
            </th>
            <th>
              {isCheckedAll && (
                <button
                  className={Styles.charateristicTableEdit__head_delete_btn_red}
                >
                  {translations[lang].dashboard_page.delete_all_characteristic}
                </button>
              )}
            </th>
            <th>
              <button
                className={Styles.charateristicTableEdit__head_delete_btn}
                onClick={handleBackButtonClick}
              >
                {translations[lang].common.cancel}
              </button>
            </th>
          </tr>
        )}

        {/* line */}
        <tr className={Styles.charateristicTableEdit__head_line}>
          <td />
        </tr>
      </thead>
      <tbody>
        {/* {!isLoading && (!characteristics || characteristics.length === 0) && (
          <NotFoundMsg
            message={
              translations[lang].dashboard_page.not_found_characteristics
            }
          />
        )} */}

        {isLoading
          ? [...Array(10)].map((_, id) => <CharacteristicRowLoader key={id} />)
          : values
              .slice()
              .reverse()
              .map((value) => (
                <CharacteristicRowEdit
                  key={value._id}
                  value={value}
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
                />
              ))}
      </tbody>
    </table>
  );
};

export default CharacteristicTableEdit;
