import Styles from '@/styles/modules/dashboard/index.module.scss';
import { useLang } from '@/hooks/useLang';
import SelectNameCharacteristic from './SelectNameCharacteristic';
import SelectValueCharacteristic from './SelectValueCharacteristic';
import Title from '@/components/elements/Title';
import { Control, useWatch } from 'react-hook-form';
import {
  IProductInputs,
  OptionCharacteristicValueType,
  OptionChatacteristicNameType,
} from '@/types/goods';
import { getCharacteristics } from '@/utils/dashboards';
import useSWR from 'swr';
import { Button } from '@/components/elements/Button';
import React from 'react';
import { ICharacteristicState } from '@/types/dashboard';
import ListCharacteristics from './ListCharacteristics';

const GoodsCharacteristics = ({
  control,
  addedCharacteristics,
  setAddedCharacteristics,
}: {
  control: Control<IProductInputs>;
  addedCharacteristics: ICharacteristicState[];
  setAddedCharacteristics: (characteristic: ICharacteristicState[]) => void;
}) => {
  const { lang, translations } = useLang();

  const selectedCharacteristicName: OptionChatacteristicNameType = useWatch({
    control,
    name: 'characteristics.name',
  });

  const selectCharacteristicValue: OptionCharacteristicValueType = useWatch({
    control,
    name: 'characteristics.value',
  });

  const { data } = useSWR('characteristics', getCharacteristics, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const characteristics = data?.data;

  const handleAddCharacteristic = (characteristic: ICharacteristicState) => {
    setAddedCharacteristics([...addedCharacteristics, characteristic]);
  };

  const handleRemoveCharacteristic = (id: string) => {
    setAddedCharacteristics(
      addedCharacteristics.filter((item) => item._id !== id)
    );
  };

  return (
    <div className={Styles.goodsCharacteristics}>
      <Title
        className={Styles.goodsCharacteristics__title}
        size='sm'
        weight='semiBold'
      >
        {translations[lang].dashboard_page.characteristic_goods}
      </Title>
      {characteristics && (
        <div className={Styles.goodsCharacteristics__add}>
          <SelectNameCharacteristic
            control={control}
            characteristics={characteristics}
          />
          <SelectValueCharacteristic
            control={control}
            characteristics={characteristics}
          />
        </div>
      )}

      <Button
        className={Styles.goodsCharacteristics__btn}
        type='button'
        onClick={() =>
          handleAddCharacteristic({
            _id: selectCharacteristicValue.value._idValueCharacteristic,
            name: selectedCharacteristicName.value,
            value: selectCharacteristicValue.value,
          })
        }
        disabled={!selectedCharacteristicName || !selectCharacteristicValue}
      >
        {translations[lang].common.add}
      </Button>

      <ListCharacteristics
        characteristics={addedCharacteristics}
        handleRemoveCharacteristic={handleRemoveCharacteristic}
      />
    </div>
  );
};

export default GoodsCharacteristics;
