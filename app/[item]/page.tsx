'use server';

import { getProductById } from '@/actions/goodsActions';
import ItemProductLayout from '@/components/layouts/ItemProductLayout';
import ProductPage from '@/components/templates/ProductPage/ProductPage';

export default async function Item({ params }: { params: { item: string } }) {
  const requiredItem = await getProductById(params.item);

  return (
    <>
      {requiredItem && (
        <ItemProductLayout data={requiredItem}>
          <ProductPage data={requiredItem} />
        </ItemProductLayout>
      )}
    </>
  );
}