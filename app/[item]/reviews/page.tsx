'use server';

import { getProductById } from '@/actions/goodsActions';
import ItemProductLayout from '@/components/layouts/ItemProductLayout';
import ReviewsPage from '@/components/templates/ProductPage/ReviewsPage/ReviewsPage';

export default async function Reviews({
  params,
}: {
  params: { item: string };
}) {
  const requiredItem = await getProductById(params.item);

  return (
    <>
      {requiredItem && (
        <ItemProductLayout data={requiredItem}>
          <ReviewsPage data={requiredItem} />
        </ItemProductLayout>
      )}
    </>
  );
}
