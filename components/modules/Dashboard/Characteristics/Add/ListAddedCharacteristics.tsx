import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';
import { IListAddedCharacteristicsProps } from '@/types/dashboard';

import CharacteristicTableEdit from '../CharacteristicTableEdit';
import Title from '@/components/elements/Title';

const ListAddedCharacteristics = ({
  state,
  onDeleteSelected,
  checkboxes,
  setCheckboxes,
}: IListAddedCharacteristicsProps) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.listAddedCharacteristics}>
      <Title size='sm' className={Styles.listAddedCharacteristics__title}>
        {translations[lang].dashboard_page.list_added_characteristics}
      </Title>

      <CharacteristicTableEdit
        values={state.values}
        isLoading={false}
        onDeleteSelected={onDeleteSelected}
        checkboxes={checkboxes}
        setCheckboxes={setCheckboxes}
      />
    </div>
  );
};

export default ListAddedCharacteristics;
