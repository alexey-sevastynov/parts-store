import Styles from '@/styles/modules/dashboard/index.module.scss';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import { IAddSubcategoriesProps } from '@/types/dashboard';
import SubcategoryForm from './SubcategoryForm';
import ListAddedSubcategories from './ListAddedSubcategories';

const AddSubcategories = ({ msg, status, data }: IAddSubcategoriesProps) => {
  const { lang, translations } = useLang();

  const ADD_SUBCATEGORIES_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.categories,
      link: ROUTES.CATEGORIES,
    },
    {
      id: 2,
      name: translations[lang].common.add,
      link: ROUTES.CATEGORIES_ADD,
    },
    {
      id: 3,
      name: data?.name[lang] || translations[lang].dashboard_page.category,
    },
  ];

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_SUBCATEGORIES_BREADCRUMBS} />
      </div>
      {data?._id && <SubcategoryForm categoryId={data?._id} />}

      {data?.subcategories && (
        <ListAddedSubcategories
          data={data?.subcategories}
          idSubcategory={data._id}
        />
      )}
    </section>
  );
};

export default AddSubcategories;
