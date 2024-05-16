import Styles from '@/styles/modules/dashboard/index.module.scss';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import { IAddSubSubcategoriesProps } from '@/types/dashboard';

import SubSubcategoryForm from './SubSubcategoryForm';
import ListAddedSubSubcategories from './ListAddedSubSubcategories';
import { getCategoryById, getSubcategoryById } from '@/actions/categoryActions';
import React from 'react';

const AddSubSubcategories = ({
  msg,
  status,
  data,
  idSubcategory,
}: IAddSubSubcategoriesProps) => {
  const { lang, translations } = useLang();

  const [subcategoryName, setSubcategoryName] = React.useState<string>('');

  React.useEffect(() => {
    const fetchSubcategoryName = async () => {
      const res = await getCategoryById(idSubcategory);

      if (res.category) setSubcategoryName(res?.category.name[lang]);
    };

    fetchSubcategoryName();
  }, [idSubcategory]);

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
      name: subcategoryName || translations[lang].dashboard_page.category,
      link: ROUTES.VIEW_SUBCATEGORIES_ADD(idSubcategory || 'unknown_id'),
    },
    {
      id: 4,
      name: data?.name[lang] || translations[lang].dashboard_page.sub_category,
    },
  ];

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_SUBCATEGORIES_BREADCRUMBS} />
      </div>

      {data?._id && <SubSubcategoryForm subcategoryId={data?._id} />}

      {data && (
        <ListAddedSubSubcategories
          data={data?.subSubcategories}
          idSubcategory={idSubcategory}
        />
      )}
    </section>
  );
};

export default AddSubSubcategories;
