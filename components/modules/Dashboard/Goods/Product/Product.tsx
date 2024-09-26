import Styles from '@/styles/modules/dashboard/index.module.scss';
import React from 'react';
import { useParams } from 'next/navigation';
import { FieldErrorsImpl, SubmitHandler, useForm } from 'react-hook-form';
import { updateProductById } from '@/actions/goodsActions';
import { useLang } from '@/hooks/useLang';
import { UploadFileResponse } from '@/types/uploathing-image/client';
import { ICharacteristicState } from '@/types/dashboard';
import { IBrand } from '@/types/brand';
import { IProduct, IProductForCreation, IProductInputs } from '@/types/goods';
import { ROUTES } from '@/constants/common';
import { Button } from '@/components/elements/Button';
import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import EditImage from './EditImage';
import DetailInfoGoods from '../Add/DetailInfoGoods/DetailInfoGoods';
import GoodsCharacteristics from '../Add/GoodsCharacteristics/GoodsCharacteristics';
import PriceAndAvailability from '../Add/PriceAndAvailability/PriceAndAvailability';
import DescriptonProduct from '../Add/DescriptionProduct/DescriptionProduct';

const Product = ({
  data,
  brands,
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
    control,
    formState: { errors },
  } = useForm<IProductInputs>({
    mode: 'onBlur',
    defaultValues: {
      name: {
        ua: data?.name?.ua,
        ru: data?.name?.ru,
        en: data?.name?.en,
      },
      category: {
        value: data?.category?._id,
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
    const arrayImages = images.map((item) => item.url).join(', ');
    const newProduct: IProductForCreation = {
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

    try {
      const res = await updateProductById(id as string, newProduct);
    } catch (error) {
      console.error(error);
    }
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
          brandsList={brands}
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
