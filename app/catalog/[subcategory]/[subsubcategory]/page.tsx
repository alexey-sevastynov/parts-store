'use server';

import SubSubcategoryPage from '@/components/templates/Catalog/SubcategoryPage/SubSubcategoryPage/SubSubcategoryPage';
import { getCategory, getSubcategory } from '@/utils/dashboards';

export default async function SubSubcategory(props: {
  params: { subcategory: string; subsubcategory: string };
  searchParams: { idCategory: string; idSubcategory: string };
}) {
  const id = props.searchParams.idSubcategory;

  try {
    const fetchedSubcategories = await getSubcategory(id);

    const fetchedCategories = await getCategory(props.searchParams.idCategory);

    if (fetchedSubcategories && fetchedCategories.data) {
      return (
        <SubSubcategoryPage
          data={fetchedSubcategories.data}
          idCategory={props.searchParams.idCategory}
          nameCategory={fetchedCategories.data.name}
        />
      );
    }
  } catch (error) {}
}
