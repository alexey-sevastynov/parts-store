'use server';

import { getCategoryById, getSubcategoryById } from '@/actions/categoryActions';
import SubSubcategoryPage from '@/components/templates/Catalog/SubcategoryPage/SubSubcategoryPage/SubSubcategoryPage';
import { getCategory, getSubcategories } from '@/utils/dashboards';

export default async function SubSubcategory(props: {
  params: { subcategory: string; subsubcategory: string };
  searchParams: { idCategory: string; idSubcategory: string };
}) {
  const id = props.searchParams.idSubcategory;

  try {
    const fetchedSubcategories = await getSubcategories(id);

    const fetchedCategories = await getCategory(
      props.searchParams.idCategory
    );

    if (fetchedSubcategories && fetchedCategories.data) {
      return (
        <SubSubcategoryPage
          data={fetchedSubcategories}
          idCategory={props.searchParams.idCategory}
          nameCategory={fetchedCategories.data.name}
        />
      );
    }
  } catch (error) {}
}
