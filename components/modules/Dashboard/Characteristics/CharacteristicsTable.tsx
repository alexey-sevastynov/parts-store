import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';

import { useLang } from '@/hooks/useLang';

import { BiSort } from 'react-icons/bi';

import {
  deleteAllCharacteristics,
  deleteSelectedCharacteristics,
} from '@/actions/characteristicActions';

import { handleCheckboxChange } from '@/utils/dashboards';
import { ICharacteristicTableProps } from '@/types/dashboard';

import CharacteristicRowLoader from './CharacteristicRowLoader';
import NotFoundMsg from '../NotFoundMsg';
import CharacteristicRow from './CharacteristicRow';
import { AnimatePresence } from 'framer-motion';

const CharacteristicTable = ({
  characteristics,
  searchResultsCharacteristic,
  isLoading,
  getCharacteristics,
}: ICharacteristicTableProps) => {
  const { lang, translations } = useLang();

  const [isSortByName, setIsSortByName] = React.useState<boolean>(false);

  const renderedCharacteristics = isSortByName
    ? searchResultsCharacteristic
        .slice()
        .sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
    : searchResultsCharacteristic.slice().reverse();

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const isCheckedAll = checkboxes['all'];

  const isAnyCheckboxChecked = Object.values(checkboxes).some(
    (value) => value === true
  );

  const isEmptyCharacteristics = characteristics.length === 0;
  const isEmptySearchResultsCharacteristic =
    searchResultsCharacteristic.length === 0;

  const deleteCharacteristics = async () => {
    try {
      const res = await deleteAllCharacteristics();
    } catch (error) {
      console.error('Failed to delete characteristic:', error);
    }
  };

  const deleteSelected = async () => {
    try {
      const selectedCharacteristicIds = Object.keys(checkboxes).filter(
        (key) => checkboxes[key] && key !== 'all'
      );
      const res = await deleteSelectedCharacteristics(
        selectedCharacteristicIds
      );

      if (res.status === 200) {
        setCheckboxes({});

        getCharacteristics();
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
    <table className={Styles.characteristicTable}>
      <thead>
        <tr className={Styles.characteristicTable__head}>
          {/* checkbox ALL */}
          <th className={Styles.characteristicTable__head_checkbox}>
            <input
              type='checkbox'
              name='all'
              checked={checkboxes['all'] || false}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(
                  characteristics,
                  event,
                  checkboxes,
                  setCheckboxes,
                  isAnyCheckboxChecked
                )
              }
              disabled={
                !characteristics ||
                isEmptySearchResultsCharacteristic ||
                isEmptyCharacteristics
              }
            />
          </th>
          {/* name */}
          <th className={Styles.characteristicTable__head_name_characteristic}>
            <button
              className={isSortByName ? Styles.btn_active : Styles.btn}
              title={translations[lang].dashboard_page.sort_by_alphabet}
              onClick={handleSortButtonClick}
            >
              <p>{translations[lang].dashboard_page.name_characteristic}</p>
              <BiSort />
            </button>
          </th>

          {/* list characteristics */}
          <th className={Styles.characteristicTable__head_list_characteristics}>
            {translations[lang].dashboard_page.list_characteristics}
          </th>
        </tr>

        {/* PANEL DELETE, WHEN SELECT */}
        {isAnyCheckboxChecked && (
          <tr className={Styles.characteristicTable__head_delete}>
            <th>
              <button
                className={Styles.characteristicTable__head_delete_btn_red}
                onClick={deleteSelected}
              >
                {
                  translations[lang].dashboard_page
                    .delete_selected_characteristic
                }
              </button>
            </th>

            <th>
              <button
                className={Styles.characteristicTable__head_delete_btn}
                onClick={handleBackButtonClick}
              >
                {translations[lang].common.cancel}
              </button>
            </th>
          </tr>
        )}

        {/* line */}
        <tr className={Styles.characteristicTable__head_line}>
          <td />
        </tr>
      </thead>
      <tbody>
        {/* Checking for data loading */}
        {isLoading &&
          // Loader Display
          [...Array(10)].map((_, id) => <CharacteristicRowLoader key={id} />)}
        {/* Checking the availability of characteristics */}
        {!isLoading && characteristics && characteristics.length === 0 && (
          <tr>
            <td>
              <NotFoundMsg
                message={translations[lang].dashboard_page.not_characteristics}
              />
            </td>
          </tr>
        )}

        {/* Checking search results */}
        {!isLoading &&
          searchResultsCharacteristic &&
          isEmptySearchResultsCharacteristic &&
          !isEmptyCharacteristics && (
            <tr>
              <td>
                <NotFoundMsg
                  message={
                    translations[lang].dashboard_page.not_found_characteristics
                  }
                />
              </td>
            </tr>
          )}
        {/* Display of characteristics */}
        <AnimatePresence initial={false}>
          {!isLoading &&
            searchResultsCharacteristic &&
            !isEmptySearchResultsCharacteristic &&
            renderedCharacteristics.map((characteristic) => (
              <CharacteristicRow
                key={characteristic._id}
                characteristic={characteristic}
                isChecked={!!checkboxes[characteristic._id as string]}
                handleCheckboxChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(
                    characteristics,
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

export default CharacteristicTable;
