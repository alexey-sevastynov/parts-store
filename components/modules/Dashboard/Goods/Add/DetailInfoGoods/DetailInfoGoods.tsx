import Styles from '@/styles/modules/dashboard/index.module.scss';

import { Control, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import { useLang } from '@/hooks/useLang';

import { IProductInputs } from '@/types/goods';
import { IBrand } from '@/types/brand';

import InfoIconWithHint from '@/components/elements/InfoIconWithHint';
import Title from '@/components/elements/Title';

import InputCodeProduct from './InputCodeProduct';
import SelectCountry from './SelectCountry';
import InputsNameProduct from './InputsNameProduct';
import SelectBrand from './SelectBrand';

const DetailInfoGoods = ({
  register,
  errors,
  brandsList,
  control,
}: {
  register: UseFormRegister<IProductInputs>;
  errors: Partial<FieldErrorsImpl<IProductInputs>>;
  brandsList: IBrand[];
  control: Control<IProductInputs>;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.detailInfoGoods}>
      <Title
        className={Styles.detailInfoGoods__title}
        size='sm'
        weight='semiBold'
      >
        {translations[lang].dashboard_page.detail_info_goods}
      </Title>

      <div className={Styles.detailInfoGoods__content}>
        <div className={Styles.detailInfoGoods__content_column}>
          <InputsNameProduct register={register} errors={errors} />

          <InfoIconWithHint
            text={translations[lang].dashboard_page.name_product_info_text}
          />
        </div>

        <div className={Styles.detailInfoGoods__content_column}>
          <SelectBrand
            errors={errors}
            brandsList={brandsList}
            control={control}
          />

          <InputCodeProduct register={register} errors={errors} />

          <SelectCountry control={control} />
        </div>
      </div>
    </div>
  );
};

export default DetailInfoGoods;
