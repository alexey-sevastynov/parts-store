import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';
import { Oval } from 'react-loader-spinner';

import { useLang } from '@/hooks/useLang';

import { COLORS } from '@/constants/colors';
import { SIZE_ICON } from '@/constants/common';

import { CharacteristicRowProps } from '@/types/dashboard';

import { updateCharacteristicValueById } from '@/actions/characteristicActions';

import { Button } from '@/components/elements/Button';

const CharacteristicRowEdit: React.FC<CharacteristicRowProps> = ({
  value,
  isChecked,
  handleCheckboxChange,
}) => {
  const { ua, ru, en, _id } = value;

  const { lang, translations } = useLang();

  const [isActiveEdit, setIsActiveEdit] = React.useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [uaValue, setUaValue] = React.useState(ua);
  const [ruValue, setRuValue] = React.useState(ru);
  const [enValue, setEnValue] = React.useState(en);

  const handleInputChange = (newValue: string, oldValue: string) => {
    if (newValue !== oldValue) {
      setIsValueChanged(true);
    } else {
      setIsValueChanged(false);
    }
  };

  const handleUaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUaValue(value);
    handleInputChange(value, ua);
  };

  const handleRuChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setRuValue(value);
    handleInputChange(value, ru);
  };

  const handleEnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setEnValue(value);
    handleInputChange(value, en);
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

    setUaValue(ua);
    setRuValue(ru);
    setEnValue(en);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (uaValue && ruValue && enValue && _id) {
      try {
        await updateCharacteristicValueById(_id, {
          ua: uaValue,
          ru: ruValue,
          en: enValue,
        });

        setIsSubmitting(false);
        setIsActiveEdit(false);
      } catch (error) {
        console.error('Failed to update characteristic value:', error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <tr
      key={_id}
      className={Styles.charateristicTableEdit__body}
      style={isChecked ? { backgroundColor: COLORS.grey } : {}}
    >
      {/* checkbox */}
      <td
        className={`${Styles.charateristicTableEdit__body_checkbox} ${
          isChecked && Styles.select
        }`}
      >
        <input
          type='checkbox'
          name={_id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>

      {/* name UA */}
      <td className={Styles.charateristicTableEdit__body_name_characteristic}>
        {isActiveEdit ? (
          <form onSubmit={handleSubmit}>
            <input value={uaValue} onChange={handleUaChange} />
          </form>
        ) : (
          ua
        )}
      </td>

      {/* name Ru */}
      <td className={Styles.charateristicTableEdit__body_name_characteristic}>
        {isActiveEdit ? (
          <form onSubmit={handleSubmit}>
            <input value={ruValue} onChange={handleRuChange} />
          </form>
        ) : (
          ru
        )}
      </td>

      {/* name En */}
      <td className={Styles.charateristicTableEdit__body_name_characteristic}>
        {isActiveEdit ? (
          <form onSubmit={handleSubmit}>
            <input value={enValue} onChange={handleEnChange} />
          </form>
        ) : (
          en
        )}
      </td>

      {/* btn edit */}
      <td className={Styles.charateristicTableEdit__body_button_block}>
        {isActiveEdit ? (
          // _______ if edit buttons
          <form
            onSubmit={handleSubmit}
            className={Styles.charateristicTableEdit__body_button_block_btns}
          >
            <Button
              className={
                Styles.charateristicTableEdit__body_button_block_btns_bnt
              }
              disabled={!isValueChanged || isSubmitting}
              type='submit'
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
                translations[lang].common.save
              )}
            </Button>
            <Button
              className={
                Styles.charateristicTableEdit__body_button_block_btns_btn
              }
              type='button'
              onClick={handleCancelEdit}
            >
              {translations[lang].common.cancel}
            </Button>
          </form>
        ) : (
          // _______ if NOT edit button
          <div
            className={Styles.charateristicTableEdit__body_button_block_btns}
          >
            <Button
              className={
                Styles.ccharateristicTableEdit__body_button_block_btns_btn
              }
              type='button'
              onClick={handleEdit}
            >
              {translations[lang].common.edit}
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CharacteristicRowEdit;
