import Styles from '@/styles/modules/dashboard/index.module.scss';

import {
  deleteAllCharacteristics,
  deleteCharacteristicById,
  deleteSelectedCharacteristics,
} from '@/actions/characteristicActions';

import { useLang } from '@/hooks/useLang';
import { ICharacteristics } from '@/types/characteristic';
import React, { ChangeEvent } from 'react';
import { BiSort } from 'react-icons/bi';
import { COLORS } from '@/constants/colors';

const CharacteristicTable = ({
  characteristics,
}: {
  characteristics?: ICharacteristics[];
}) => {
  if (!characteristics) return <p>nothing</p>;

  const { lang, translations } = useLang();

  const [isSortByName, setIsSortByName] = React.useState<boolean>(false);

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const isCheckedAll = checkboxes['all'];

  const isAnyCheckboxChecked = Object.values(checkboxes).some(
    (value) => value === true
  );

  const deleteCharacteristics = async () => {
    try {
      const res = await deleteAllCharacteristics();
      console.log(res);
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
      console.log(res);
    } catch (error) {
      console.error('Failed to delete selected characteristics:', error);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // If the "all" checkbox is selected, set the state of all checkboxes
    if (name === 'all') {
      const updatedCheckboxes: {
        [key: string]: boolean;
      } = {};

      // If "all" is selected, set all checkboxes to true
      if (checked) {
        characteristics?.forEach((characteristic) => {
          updatedCheckboxes[characteristic._id as string] = true;
        });
      }

      // Update the status of the checkboxes, including the "all" checkboxes
      setCheckboxes({ ...updatedCheckboxes, all: checked });
    } else {
      // If another checkbox is selсected, update its state
      const updatedCheckboxes = { ...checkboxes, [name]: checked };

      // If the selected checkbox is deselected, deselect "all".
      if (!checked) {
        updatedCheckboxes.all = false;
      } else {
        // If a checkbox is selected and there are other selected checkboxes, select "all".
        if (isAnyCheckboxChecked && name !== 'all') {
          updatedCheckboxes.all = true;
        }
      }

      // Update checkboxes status
      setCheckboxes(updatedCheckboxes);
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

  const listChatacteristic = ({ _id, name, values }: ICharacteristics) => {
    return (
      <tr
        key={_id}
        className={Styles.characteristicTable__body}
        style={
          checkboxes[_id as string] ? { backgroundColor: COLORS.grey } : {}
        }
      >
        <td
          className={`${Styles.characteristicTable__body_checkbox} ${
            checkboxes[_id as string] && Styles.select
          }`}
        >
          <input
            type='checkbox'
            name={_id}
            checked={checkboxes[_id as string] || false}
            onChange={handleCheckboxChange}
          />
        </td>
        <td className={Styles.characteristicTable__head_name_characteristic}>
          {name[lang]}
        </td>
        <td className={Styles.characteristicTable__head_list_characteristics}>
          {values.map((item) => {
            // Check if there is a translation for the current language
            if (item.hasOwnProperty(lang)) {
              return (
                <p
                  className={
                    Styles.characteristicTable__head_list_characteristics_item
                  }
                  key={item._id}
                >
                  {item[lang] + ', '}
                </p>
              );
            }
            // If there is no translation for the current language, return null
            return null;
          })}
        </td>
      </tr>
    );
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
              onChange={handleCheckboxChange}
              disabled={!characteristics}
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
              {isCheckedAll && (
                <button
                  className={Styles.characteristicTable__head_delete_btn_red}
                  onClick={deleteCharacteristics}
                >
                  {translations[lang].dashboard_page.delete_all_characteristic}
                </button>
              )}
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
        {isSortByName
          ? characteristics
              .slice() // Create a copy of the array so as not to modify the original one
              .sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
              .map(({ values, name, _id }) => {
                return (
                  <tr
                    key={_id}
                    className={Styles.characteristicTable__body}
                    style={
                      checkboxes[_id as string]
                        ? { backgroundColor: COLORS.grey }
                        : {}
                    }
                  >
                    <td
                      className={`${Styles.characteristicTable__body_checkbox} ${
                        checkboxes[_id as string] && Styles.select
                      }`}
                    >
                      <input
                        type='checkbox'
                        name={_id}
                        checked={checkboxes[_id as string] || false}
                        onChange={handleCheckboxChange}
                      />
                    </td>
                    <td
                      className={
                        Styles.characteristicTable__head_name_characteristic
                      }
                    >
                      {name[lang]}
                    </td>
                    <td
                      className={
                        Styles.characteristicTable__head_list_characteristics
                      }
                    >
                      {values.map((item) => {
                        // Check if there is a translation for the current language
                        if (item.hasOwnProperty(lang)) {
                          return (
                            <p
                              className={
                                Styles.characteristicTable__head_list_characteristics_item
                              }
                              key={item._id}
                            >
                              {item[lang] + ', '}
                            </p>
                          );
                        }
                        // If there is no translation for the current language, return null
                        return null;
                      })}
                    </td>
                  </tr>
                );
              })
          : characteristics.map(({ values, name, _id }) => {
              return (
                <tr
                  key={_id}
                  className={Styles.characteristicTable__body}
                  style={
                    checkboxes[_id as string]
                      ? { backgroundColor: COLORS.grey }
                      : {}
                  }
                >
                  <td
                    className={`${Styles.characteristicTable__body_checkbox} ${
                      checkboxes[_id as string] && Styles.select
                    }`}
                  >
                    <input
                      type='checkbox'
                      name={_id}
                      checked={checkboxes[_id as string] || false}
                      onChange={handleCheckboxChange}
                    />
                  </td>
                  <td
                    className={
                      Styles.characteristicTable__head_name_characteristic
                    }
                  >
                    {name[lang]}
                  </td>
                  <td
                    className={
                      Styles.characteristicTable__head_list_characteristics
                    }
                  >
                    {values.map((item) => {
                      // Check if there is a translation for the current language
                      if (item.hasOwnProperty(lang)) {
                        return (
                          <p
                            className={
                              Styles.characteristicTable__head_list_characteristics_item
                            }
                            key={item._id}
                          >
                            {item[lang] + ', '}
                          </p>
                        );
                      }
                      // If there is no translation for the current language, return null
                      return null;
                    })}
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};

export default CharacteristicTable;
