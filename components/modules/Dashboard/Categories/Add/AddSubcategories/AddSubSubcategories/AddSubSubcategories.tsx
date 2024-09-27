import Styles from '@/styles/modules/dashboard/index.module.scss';
import React from 'react';
import { getCategoryById, getSubcategoryById } from '@/actions/categoryActions';
import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import { IAddSubSubcategoriesProps } from '@/types/dashboard';
import { ISubSubcategory } from '@/types/category';
import SubSubcategoryForm from './SubSubcategoryForm';
import ListAddedSubSubcategories from './ListAddedSubSubcategories';

const AddSubSubcategories = ({
  data,
  idCategory,
}: IAddSubSubcategoriesProps) => {
  const { lang, translations } = useLang();

  const [subcategoryName, setSubcategoryName] = React.useState<string>(
    data?.name[lang] || ''
  );
  const [subSubcategoryList, setSubSubcategoryList] = React.useState<
    ISubSubcategory[]
  >(data?.subSubcategories);

  const isLoading: boolean = !Object.assign(data);

  const updateListSubSubcategories = async () => {
    const res = await getSubcategoryById(data._id as string);

    if (res.data) {
      setSubSubcategoryList(res.data.subSubcategories);
    }
  };

  React.useEffect(() => {
    const fetchSubcategoryName = async () => {
      const res = await getCategoryById(idCategory);

      if (res.data) setSubcategoryName(res?.data.name[lang]);
    };

    fetchSubcategoryName();
  }, [idCategory]);

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
      link: ROUTES.VIEW_SUBCATEGORIES_ADD(idCategory || 'unknown_id'),
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

      {data?._id && (
        <SubSubcategoryForm
          subcategoryId={data?._id}
          updateListData={updateListSubSubcategories}
        />
      )}

      {data && (
        <ListAddedSubSubcategories
          data={subSubcategoryList}
          idCategory={idCategory}
          isLoading={isLoading}
          updateListData={updateListSubSubcategories}
        />
      )}
    </section>
  );
};

export default AddSubSubcategories;
