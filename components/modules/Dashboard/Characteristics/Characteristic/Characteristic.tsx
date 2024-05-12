'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';
import { useParams } from 'next/navigation';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import {
  addOrUpdateCharacteristicValue,
  deleteSelectedCharacteristicValues,
} from '@/actions/characteristicActions';

import { ICharacteristicProps } from '@/types/dashboard';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import CharacteristicInfoList from './CharacteristicInfoList';
import AddCharacteristicValue from '../Add/AddCharacteristicValue';
import CharacteristicInfoName from './CharacteristicInfoName';
import { getCharacteristic } from '@/utils/dashboards';
import { ILanguageStrings } from '@/types/constants';

const Characteristic = ({ data, status, msg }: ICharacteristicProps) => {
  const params = useParams();
  const { lang, translations } = useLang();

  const { name, values, _id } = data;

  const [valuesCharacteristic, setValuesCharacteristic] =
    React.useState<ILanguageStrings[]>(values);

  const isLoading: boolean = !Object.assign(data);

  const [value, setValue] = React.useState<{
    valueUa: string;
    valueRu: string;
    valueEn: string;
  }>({
    valueUa: '',
    valueRu: '',
    valueEn: '',
  });

  const [uaName, setUaName] = React.useState<string>(name.ua);
  const [ruName, setRuName] = React.useState<string>(name.ru);
  const [enName, setEnName] = React.useState<string>(name.en);

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const id = Array.isArray(params.id) ? params.id.join(', ') : params.id;

  const updateCharacteristic = async (id: string) => {
    const newCharacteristic = await getCharacteristic(id);

    setValuesCharacteristic(newCharacteristic.characteristic.values);
  };

  const CHARACTRERISTIC_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.characteristics,
      link: ROUTES.CHARACTERISTICS,
    },
    {
      id: 2,
      name: id,
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const addValue = async () => {
    const { valueUa, valueRu, valueEn } = value;

    if (valueUa && valueRu && valueEn && _id) {
      try {
        await addOrUpdateCharacteristicValue(_id, {
          ua: valueUa,
          ru: valueRu,
          en: valueEn,
        });

        updateCharacteristic(_id);
      } catch (error) {
        console.error('Failed to update characteristic values:', error);
      }
    }
  };

  const deleteSelected = async () => {
    try {
      const selectedCharacteristicIds = Object.keys(checkboxes).filter(
        (key) => checkboxes[key] && key !== 'all'
      );
      const res = await deleteSelectedCharacteristicValues(
        selectedCharacteristicIds
      );
      console.log(res);
    } catch (error) {
      console.error('Failed to delete selected characteristics:', error);
    }
  };

  return (
    <section className={Styles.characteristic}>
      <div className={Styles.characteristic__head}>
        <Breadcrumbs items={CHARACTRERISTIC_BREADCRUMBS} />
      </div>

      <span className={Styles.characteristic__line} />

      <div className={Styles.characteristic__info}>
        <CharacteristicInfoName
          data={name}
          uaName={uaName}
          ruName={ruName}
          enName={enName}
          setUaName={setUaName}
          setRuName={setRuName}
          setEnName={setEnName}
          id={_id || 'error_id'}
        />

        <AddCharacteristicValue
          state={value}
          handleChange={handleChange}
          addValue={addValue}
        />
      </div>

      <CharacteristicInfoList
        values={valuesCharacteristic}
        isLoading={isLoading}
        onDeleteSelected={deleteSelected}
        checkboxes={checkboxes}
        setCheckboxes={setCheckboxes}
      />
    </section>
  );
};

export default Characteristic;
