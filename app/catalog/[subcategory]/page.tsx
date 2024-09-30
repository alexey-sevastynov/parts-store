'use server';
import SubcategoryPage from '@/components/templates/Catalog/SubcategoryPage/SubcategoryPage';
import { getCategory } from '@/utils/dashboards';

export default async function Subcategory(props: {
  params: { subcategory: string };
  searchParams: { id: string };
}) {
  const id = props.searchParams.id;
  const fetchedCategories = await getCategory(id);

  if (fetchedCategories.data) {
    return <SubcategoryPage data={fetchedCategories.data} />;
  }
}
