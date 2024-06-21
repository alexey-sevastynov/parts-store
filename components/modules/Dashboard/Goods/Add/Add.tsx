'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import { FieldErrorsImpl, SubmitHandler, useForm } from 'react-hook-form';

import { IProduct, IProductInputs, ITest } from '@/types/goods';
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
import DescriptonProduct from './DescriptionProduct/DescriptionProduct';
import { createProduct, createTestProduct } from '@/actions/goodsActions';
import { UploadFileResponse } from '@/types/uploathing-image/client';
import { usePathname } from 'next/navigation';

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

  const [isFormDirty, setIsFormDirty] = React.useState(false);

  const [brandsList, setBrandsList] = React.useState<IBrand[]>(brands);

  const [addedCharacteristics, setAddedCharacteristics] = React.useState<
    ICharacteristicState[]
  >([]);

  const [product, setProduct] = React.useState<IProduct>();

  const [image, setImage] = React.useState<UploadFileResponse[]>([]);

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
    const arrayImages = image.map((item) => item.url).join(', ');
    console.log('Entering onSubmit');
    const newProduct: IProduct = {
      name: data.name,
      category: data.category.value || 'unknown category',
      brand: data.brand.value || 'unknown brand',
      sku: data.sku,
      price: data.price,
      salePrice: data.salePrice || null,
      photos: arrayImages,

      description: data.description,
      country: data.country?.value,
      quantityAvailable: data.quantityAvailable,
      characteristics: addedCharacteristics.map((characteristic) => {
        return {
          name: characteristic.value._idCharacteristic,
          value: characteristic.value._idValueCharacteristic,
        };
      }),

      analogs: undefined,
      reviews: undefined,
      compatibleCars: undefined,
      rating: undefined,
    };

    console.log('newProduct:', newProduct);
    console.log('data:', data);

    try {
      const res = await createProduct(newProduct);

      setIsFormDirty(false);
      console.log('result:', res);

      if (!product) {
        setProduct(newProduct);
        console.log('Setting product...');
      }
    } catch (error) {
      console.error(error);
    }
    console.log('Leaving onSubmit');
  };

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_GOODS_BREADCRUMBS} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={Styles.add__line} />
        <AddImages images={image} setImages={setImage} />

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

        <DescriptonProduct control={control} />

        <Button className={Styles.add__btn} type='submit'>
          {translations[lang].common.add}
        </Button>
      </form>

      {product && (
        <>
          <p>{product.name[lang]}</p>
          <p>{product.price}</p>
          <p>{product.salePrice}</p>
          _____
          <div
            dangerouslySetInnerHTML={{ __html: product.description[lang] }}
          />
          _____s
          {/* <pre>{product.description.en}</pre>
          <pre></pre> */}
        </>
      )}
    </section>
  );
};

export default Add;
