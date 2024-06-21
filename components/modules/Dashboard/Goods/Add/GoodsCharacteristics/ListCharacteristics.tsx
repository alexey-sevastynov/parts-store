import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import { ICharacteristicState } from '@/types/dashboard';

import Title from '@/components/elements/Title';

const ListCharacteristics = ({
  characteristics,
  handleRemoveCharacteristic,
}: {
  characteristics: ICharacteristicState[];
  handleRemoveCharacteristic: (id: string) => void;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.listCharacteristics}>
      <Title
        className={Styles.listCharacteristics__title}
        size='sm'
        weight='semiBold'
      >
        {translations[lang].dashboard_page.list_added_characteristics}
      </Title>

      {!!!characteristics.length && (
        <p className={Styles.listCharacteristics__no_characteristics}>
          {translations[lang].dashboard_page.not_characteristics}
        </p>
      )}

      {!!characteristics.length && (
        <ul className={Styles.listCharacteristics__list}>
          <li className={Styles.listCharacteristics__list_item}>
            {/* // _____header table_____ */}
            <div className={Styles.listCharacteristics__list_item_column}>
              <Title size='sm'>
                {translations[lang].dashboard_page.name_characteristic}
              </Title>
            </div>
            <div className={Styles.listCharacteristics__list_item_column}>
              <Title size='sm'>
                {translations[lang].dashboard_page.description_characteristic}
              </Title>
            </div>
          </li>

          {/* // ______body table_____ */}

          {characteristics
            .slice()
            .reverse()
            .map((characteristic) => (
              <li
                key={characteristic._id}
                className={Styles.listCharacteristics__list_item}
              >
                <div className={Styles.listCharacteristics__list_item_column}>
                  <p>{characteristic.name[lang]}</p>
                </div>

                <div className={Styles.listCharacteristics__list_item_column}>
                  <p>{characteristic.value[lang]}</p>
                </div>
                <button
                  type='button'
                  onClick={() => handleRemoveCharacteristic(characteristic._id)}
                >
                  {translations[lang].common.delete}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ListCharacteristics;
