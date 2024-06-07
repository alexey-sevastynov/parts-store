import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useLang } from '@/hooks/useLang';
import DescriptionInput from './DescriptionInput';
import { Control } from 'react-hook-form';
import { IProductInputs } from '@/types/goods';
import Title from '@/components/elements/Title';

const DescriptonProduct = ({
  control,
}: {
  control: Control<IProductInputs>;
}) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.descriptonProduct}>
      <Title
        className={Styles.detailInfoGoods__title}
        size='sm'
        weight='semiBold'
      >
        {translations[lang].dashboard_page.detail_info_goods}
      </Title>
      <div className={Styles.descriptonProduct__inputs}>
        <DescriptionInput
          control={control}
          lang='ua'
          label={translations[lang].dashboard_page.description_ukraine}
        />
        <DescriptionInput
          control={control}
          lang='ru'
          label={translations[lang].dashboard_page.description_russian}
        />
        <DescriptionInput
          control={control}
          lang='en'
          label={translations[lang].dashboard_page.description_english}
        />
      </div>
    </div>
  );
};

export default DescriptonProduct;
