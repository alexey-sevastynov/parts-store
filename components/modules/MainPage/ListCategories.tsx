import Styles from '@/styles/modules/main-page/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { ICategory } from '@/types/category';
import ItemLinkCategory from '@/components/elements/ItemLinkCategory';
import { ROUTES } from '@/constants/common';

const ListCategories = ({ categories }: { categories: ICategory[] }) => {
  const { lang } = useLang();

  return (
    <ul className={Styles.listCategories}>
      {categories.map((category) => (
        <ItemLinkCategory
          key={category._id}
          icon={category.imageUrl}
          title={category.name[lang]}
          href={ROUTES.VIEW_CATEGORY_BY_ID(
            category.name.en,
            category._id as string
          )}
        />
      ))}
    </ul>
  );
};

export default ListCategories;
