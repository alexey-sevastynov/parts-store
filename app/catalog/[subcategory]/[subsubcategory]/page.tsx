'use server';

import { getCategoryById, getSubcategoryById } from '@/actions/categoryActions';
import SubSubcategoryPage from '@/components/templates/Catalog/SubcategoryPage/SubSubcategoryPage/SubSubcategoryPage';

export default async function SubSubcategory(props: {
  params: { subcategory: string; subsubcategory: string };
  searchParams: { idCategory: string; idSubcategory: string };
}) {
  const id = props.searchParams.idSubcategory;

  try {
    const fetchedSubcategories = await getSubcategoryById(id);

    const fetchedCategories = await getCategoryById(
      props.searchParams.idCategory
    );

    if (fetchedSubcategories.subcategory && fetchedCategories.category) {
      return (
        <SubSubcategoryPage
          data={fetchedSubcategories.subcategory}
          idCategory={props.searchParams.idCategory}
          nameCategory={fetchedCategories.category.name}
        />
      );
    }
  } catch (error) {}
}
