import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { FieldErrorsImpl, SubmitHandler, useForm } from 'react-hook-form';

import { IProductInputs } from '@/types/goods';
import { IBrand } from '@/types/brand';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Button } from '@/components/elements/Button';
import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import DetailInfoGoods from './DetailInfoGoods/DetailInfoGoods';

import AddImages from './AddImages';
import GoodsCharacteristics from './GoodsCharacteristics/GoodsCharacteristics';
import { ICharacteristicState } from '@/types/dashboard';
import PriceAndAvailability from './PriceAndAvailability/PriceAndAvailability';

const Add = ({
  brands,
  brandsStatus,
  brandsMsg,
}: {
  brands: IBrand[];
  brandsStatus: number;
  brandsMsg: string;
}) => {
  const { lang, translations } = useLang();

  const [brandsList, setBrandsList] = React.useState<IBrand[]>(brands);

  const [addedCharacteristics, setAddedCharacteristics] = React.useState<
    ICharacteristicState[]
  >([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IProductInputs>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const ADD_GOODS_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.goods,
      link: ROUTES.GOODS,
    },
    {
      id: 2,
      name: translations[lang].common.add,
    },
  ];

  const onSubmit: SubmitHandler<IProductInputs> = async (data) => {
    data.characteristics = addedCharacteristics;
    console.log(data);
  };

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_GOODS_BREADCRUMBS} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={Styles.add__line} />
        <AddImages />

        <span className={Styles.add__line} />
        <DetailInfoGoods
          register={register}
          control={control}
          errors={errors as Partial<FieldErrorsImpl<IProductInputs>>}
          brandsList={brandsList}
        />

        <span className={Styles.add__line} />
        <GoodsCharacteristics
          control={control}
          addedCharacteristics={addedCharacteristics}
          setAddedCharacteristics={setAddedCharacteristics}
        />

        <span className={Styles.add__line} />
        <PriceAndAvailability
          register={register}
          errors={errors as Partial<FieldErrorsImpl<IProductInputs>>}
        />

        <Button className={Styles.add__btn} type='submit'>
          {translations[lang].common.add}
        </Button>
      </form>
    </section>
  );
};

export default Add;
