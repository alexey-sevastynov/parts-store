'use server';

import { getAllCategories, getCategoryById } from '@/actions/categoryActions';
import SubcategoryPage from '@/components/templates/Catalog/SubcategoryPage/SubcategoryPage';
import MainPage from '@/components/templates/MainPage/MainPage';
import { getCategory } from '@/utils/dashboards';

export default async function Subcategory(props: {
  params: { subcategory: string };
  searchParams: { id: string };
}) {
  const categoryName = props.params.subcategory;

  const id = props.searchParams.id;

  try {
    const fetchedCategories = await getCategory(id);

    if (fetchedCategories.data) {
      return <SubcategoryPage data={fetchedCategories.data} />;
    }
  } catch (error) {}
}
