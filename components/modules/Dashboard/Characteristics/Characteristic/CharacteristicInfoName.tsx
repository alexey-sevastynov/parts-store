import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { Oval } from 'react-loader-spinner';

import { useLang } from '@/hooks/useLang';

import { ICharacteristicInfoNameProps } from '@/types/dashboard';

import { updateCharacteristicNameById } from '@/actions/characteristicActions';

import { SIZE_ICON } from '@/constants/common';
import { COLORS } from '@/constants/colors';

import Title from '@/components/elements/Title';
import { Button } from '@/components/elements/Button';

const CharacteristicInfoName = ({
  data,
  id,
  uaName,
  ruName,
  enName,
  setUaName,
  setRuName,
  setEnName,
}: ICharacteristicInfoNameProps) => {
  const { lang, translations } = useLang();

  const [isActiveEdit, setIsActiveEdit] = React.useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsActiveEdit(true);
  };

  const handleCancelEdit = () => {
    setIsActiveEdit(false);
    setIsValueChanged(false);
    setUaName(data.ua);
    setRuName(data.ru);
    setEnName(data.en);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await updateCharacteristicNameById(id, {
        ua: uaName,
        ru: ruName,
        en: enName,
      });

      setIsActiveEdit(false);
      setIsValueChanged(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error occurred during form submission:', error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (newValue: string, oldValue: string) => {
    if (newValue !== oldValue) {
      setIsValueChanged(true);
    } else {
      setIsValueChanged(false);
    }
  };

  return (
    <div className={Styles.characteristicInfoName}>
      <Title size='sm' className={Styles.characteristicInfoName__title}>
        {
          translations[lang].dashboard_page
            .name_characteristic_different_language
        }
      </Title>

      <form
        className={Styles.characteristicInfoName__form}
        onSubmit={handleSubmit}
      >
        <div className={Styles.characteristicInfoName__content}>
          <ul className={Styles.characteristicInfoName__content_list}>
            {/* ____________value ua */}
            <li className={Styles.characteristicInfoName__content_list_item}>
              <label>{translations[lang].dashboard_page.name_ua}</label>

              {isActiveEdit ? (
                <input
                  value={uaName}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleInputChange(newValue, data.ua);
                    setUaName(newValue);
                  }}
                  placeholder="Введіть ім'я"
                />
              ) : (
                <p>{uaName}</p>
              )}
            </li>

            {/* ____________value ru */}
            <li className={Styles.characteristicInfoName__content_list_item}>
              <label>{translations[lang].dashboard_page.name_ru}</label>

              {isActiveEdit ? (
                <input
                  value={ruName}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleInputChange(newValue, data.ru);
                    setRuName(newValue);
                  }}
                  placeholder='Введить имя'
                />
              ) : (
                <p>{ruName}</p>
              )}
            </li>

            {/* ____________value en */}
            <li className={Styles.characteristicInfoName__content_list_item}>
              <label>{translations[lang].dashboard_page.name_en}</label>

              {isActiveEdit ? (
                <input
                  value={enName}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleInputChange(newValue, data.en);
                    setEnName(newValue);
                  }}
                  placeholder='Enter a name'
                />
              ) : (
                <p>{enName}</p>
              )}
            </li>
          </ul>
        </div>

        {isActiveEdit ? (
          // _______ if edit buttons
          <div className={Styles.characteristicInfoName__btns}>
            <Button
              className={Styles.characteristicInfoName__btn}
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
              className={Styles.characteristicInfoName__btn}
              type='button'
              onClick={handleCancelEdit}
            >
              {translations[lang].common.cancel}
            </Button>
          </div>
        ) : (
          // _______ if NOT edit button
          <div className={Styles.characteristicInfoName__btns}>
            <Button
              className={Styles.characteristicInfoName__btn}
              type='button'
              onClick={handleEdit}
            >
              {translations[lang].common.edit}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CharacteristicInfoName;
