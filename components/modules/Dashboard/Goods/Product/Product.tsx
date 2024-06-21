import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { IProduct, IProductInputs } from '@/types/goods';

import React from 'react';
import EditImage from './EditImage';
import DetailInfoGoods from '../Add/DetailInfoGoods/DetailInfoGoods';
import { FieldErrorsImpl, SubmitHandler, useForm } from 'react-hook-form';
import { IBrand } from '@/types/brand';
import GoodsCharacteristics from '../Add/GoodsCharacteristics/GoodsCharacteristics';
import { ICharacteristicState } from '@/types/dashboard';
import PriceAndAvailability from '../Add/PriceAndAvailability/PriceAndAvailability';
import DescriptonProduct from '../Add/DescriptionProduct/DescriptionProduct';
import { Button } from '@/components/elements/Button';
import { UploadFileResponse } from '@/types/uploathing-image/client';
import { createProduct, updateProductById } from '@/actions/goodsActions';
import { useParams, usePathname } from 'next/navigation';

const Product = ({
  data,
  status,
  msg,
  brands,
  brandsStatus,
  brandsMsg,
}: {
  data: IProduct;
  status: number;
  msg: string;
  brands: IBrand[];
  brandsStatus: number;
  brandsMsg: string;
}) => {
  const { lang, translations } = useLang();

  const { id } = useParams();

  const [images, setImages] = React.useState<UploadFileResponse[]>([]);
  const [brandsList, setBrandsList] = React.useState<IBrand[]>(brands);
  const [addedCharacteristics, setAddedCharacteristics] = React.useState<
    ICharacteristicState[]
  >(
    data?.characteristics
      ? data.characteristics.map((item) => ({
          _id: item?.name?.name?._id || '',
          name: {
            _id: item?.name?.name?._id || '',
            en: item?.name?.name?.en,
            ru: item?.name?.name?.ru,
            ua: item?.name?.name?.ua,
          },
          value: {
            _idCharacteristic: item.name._id || '',
            _idValueCharacteristic: item?.value?._id || '',
            en: item?.value?.en,
            ru: item?.value?.ru,
            ua: item?.value?.ua,
          },
        }))
      : []
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IProductInputs>({
    mode: 'onBlur',
    defaultValues: {
      name: {
        ua: data?.name?.ua,
        ru: data?.name?.ru,
        en: data?.name?.en,
      },
      category: {
        value: {
          _id: data?.category?._id,
          ua: data?.category?.name?.ua,
          ru: data?.category?.name?.ru,
          en: data?.category?.name?.en,
        },
        label: data?.category?.name?.[lang] || '',
      },
      brand: {
        value: data?.brand?._id,
        label: data?.brand?.name,
      },
      sku: data?.sku,
      country: {
        value: {
          ua: data?.country?.ua || '',
          ru: data?.country?.ru || '',
          en: data?.country?.en || '',
        },
        label: data?.country?.[lang] || '',
      },
      quantityAvailable: data?.quantityAvailable,
      price: data?.price,
      salePrice: data?.salePrice || null,
      description: {
        ua: data?.description?.ua || '',
        ru: data?.description?.ru || '',
        en: data?.description?.en || '',
      },
    },
  });

  const CUSTOMER_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.goods,
      link: ROUTES.GOODS,
    },
    {
      id: 2,
      name: data.name[lang],
    },
  ];

  React.useEffect(() => {
    setImages(
      data.photos
        ? data.photos.split(',').map((url) => ({
            url: url,
            fileName: url,
            name: url,
            fileSize: 0,
            size: 0,
            key: url,
            fileKey: url,
            fileUrl: '',
          }))
        : []
    );
  }, [data.photos]); // <-- Add data.photos as dependency

  const onSubmit: SubmitHandler<IProductInputs> = async (data) => {
    console.log('Entering onSubmit: ', data);

    const arrayImages = images.map((item) => item.url).join(', ');
    const newProduct: IProduct = {
      name: data.name,
      category: data.category.value,
      brand: data.brand.value,
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
    };

    console.log('newProduct:', newProduct);

    try {
      const res = await updateProductById(id as string, newProduct);

      console.log('result:', res);
    } catch (error) {
      console.error(error);
    }
    console.log('Leaving onSubmit');
  };

  return (
    <section className={Styles.product}>
      <div className={Styles.product__head}>
        <Breadcrumbs items={CUSTOMER_BREADCRUMBS} />
      </div>

      {data.photos && <EditImage images={images} setImages={setImages} />}

      <form onSubmit={handleSubmit(onSubmit)}>
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
          {translations[lang].common.edit}
        </Button>
      </form>
    </section>
  );
};

export default Product;

// {"_id":{"$oid":"6673c97087f1f77e97b678e3"},"name":{"en":"CARr","ru":"CARr","ua":"CARr"},"category":{"$oid":"6654777c0fd81e1320d5a65d"},"brand":{"$oid":"665b0a81fc8b56a22e035e34"},"sku":"CAR","price":{"$numberInt":"1112"},"salePrice":{"$numberInt":"1111"},"photos":"https://utfs.io/f/ce46deed-be0f-45e7-be5e-25d2402ffbd1-360gn5.png","description":{"en":"<p>3</p>","ru":"<p>2</p>","ua":"<p>1</p>"},"country":{"en":"Austria","ru":"Австрия","ua":"Австрия"},"quantityAvailable":{"$numberInt":"12"},"characteristics":[{"name":"6640f6126bbd3b9cc35e531b","value":"6640f6126bbd3b9cc35e5317","_id":{"$oid":"6673c97087f1f77e97b678e4"}},{"name":"6640f7e26bbd3b9cc35e533b","value":"6640f7e26bbd3b9cc35e5337","_id":{"$oid":"6673c97087f1f77e97b678e5"}}],"createdAt":{"$date":{"$numberLong":"1718864240586"}},"updatedAt":{"$date":{"$numberLong":"1718864240586"}},"__v":{"$numberInt":"0"}}
