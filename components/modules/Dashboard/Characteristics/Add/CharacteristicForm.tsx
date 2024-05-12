import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { v4 } from 'uuid';

import { useLang } from '@/hooks/useLang';

import { createCharacteristic } from '@/actions/characteristicActions';

import { ICharacteristics } from '@/types/characteristic';
import { CharacteristicFormState } from '@/types/dashboard';

import { Button } from '@/components/elements/Button';
import AddCharacteristicName from './AddCharacteristicName';
import AddCharacteristicValue from './AddCharacteristicValue';
import ListAddedCharacteristics from './ListAddedCharacteristics';
import NotificationBar from '@/components/elements/NotificationBar';
import { TypeNotificationMessage } from '@/types/elements';

export default function CharacteristicForm() {
  const { lang, translations } = useLang();

  const [state, setState] = useState<CharacteristicFormState>({
    nameEn: '',
    nameRu: '',
    nameUa: '',
    valueEn: '',
    valueRu: '',
    valueUa: '',
    values: [],
  });
  const [notification, setNotification] = React.useState<null | {
    type: TypeNotificationMessage;
    message: string;
  }>(null);

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const addValue = (): void => {
    if (state.valueEn && state.valueRu && state.valueUa) {
      setState({
        ...state,
        values: [
          ...state.values,
          {
            _id: v4(),
            en: state.valueEn,
            ru: state.valueRu,
            ua: state.valueUa,
          },
        ],
        valueEn: '',
        valueRu: '',
        valueUa: '',
      });
    }
  };

  const handleEdit = (index: number): void => {
    // Implement edit functionality here
  };

  const handleDelete = (): void => {
    // Создаем копию массива значений
    const updatedValues = [...state.values];
    // Проходимся по всем ключам чекбоксов
    Object.keys(checkboxes).forEach((key) => {
      // Если значение чекбокса true (выделено), удаляем соответствующий элемент из массива значений
      if (checkboxes[key]) {
        // Ищем индекс элемента в массиве по его id (ключу чекбокса)
        const index = updatedValues.findIndex((value) => value._id === key);
        // Если элемент найден, удаляем его из массива
        if (index !== -1) {
          updatedValues.splice(index, 1);
        }
      }
    });
    // Обновляем состояние значениями без удаленных элементов
    setState({ ...state, values: updatedValues });
    // Сбрасываем все чекбоксы после удаления
    setCheckboxes({});
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // Создаем копию массива значений без поля _id
    const valuesWithoutId = state.values.map(({ _id, ...rest }) => rest);

    const characteristics: ICharacteristics = {
      name: {
        en: state.nameEn,
        ru: state.nameRu,
        ua: state.nameUa,
      },
      values: valuesWithoutId, // Передаем массив без поля _id
    };

    if (
      characteristics.name.ua &&
      characteristics.name.ru &&
      characteristics.name.en &&
      characteristics.values.length > 0
    )
      try {
        const response = await createCharacteristic(characteristics);

        await showNotification(
          'success',
          `${translations[lang].common.success_fetch}: "${response.msg}"`
        );

        // Clear the state after a successful operation
        setState({
          nameEn: '',
          nameRu: '',
          nameUa: '',
          valueEn: '',
          valueRu: '',
          valueUa: '',
          values: [],
        });
      } catch (error: any) {
        showNotification(
          'error',
          `${translations[lang].common.error_fetch}: ${error.message}`
        );
      }
  };

  const showNotification = (type: TypeNotificationMessage, message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null); // Here we set null to hide the notification
    }, 3000);
  };

  return (
    <form className={Styles.characteristicForm} onSubmit={handleSubmit}>
      <span className={Styles.characteristicForm__line} />
      <div className={Styles.characteristicForm__inputs}>
        <AddCharacteristicName state={state} handleChange={handleChange} />
        <AddCharacteristicValue
          state={state}
          handleChange={handleChange}
          addValue={addValue}
        />
      </div>

      <span className={Styles.characteristicForm__line} />
      <ListAddedCharacteristics
        state={state}
        onDeleteSelected={handleDelete}
        checkboxes={checkboxes}
        setCheckboxes={setCheckboxes}
      />

      {notification && (
        <div className={Styles.characteristicForm__notification}>
          <NotificationBar type={notification.type}>
            {notification.message}
          </NotificationBar>
        </div>
      )}

      <div className={Styles.characteristicForm__submit}>
        <Button
          type='submit'
          disabled={
            !state.nameUa ||
            !state.nameRu ||
            !state.nameEn ||
            state.values.length === 0
          }
        >
          {translations[lang].common.add}
        </Button>
      </div>
    </form>
  );
}
