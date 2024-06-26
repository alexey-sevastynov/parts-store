'use server';

import { getProductById } from '@/actions/goodsActions';
import ItemProductLayout from '@/components/layouts/ItemProductLayout';
import AnalogsPage from '@/components/templates/ProductPage/AnalogsPage/AnalogsPage';

export default async function Analogs({
  params,
}: {
  params: { item: string };
}) {
  const requiredItem = await getProductById(params.item);

  return (
    <>
      {requiredItem && (
        <ItemProductLayout data={requiredItem}>
          <AnalogsPage data={requiredItem} />
        </ItemProductLayout>
      )}
    </>
  );
}
