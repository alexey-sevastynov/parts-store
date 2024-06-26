'use server';

import { getProductById } from '@/actions/goodsActions';
import ItemProductLayout from '@/components/layouts/ItemProductLayout';
import CharacterisicsPage from '@/components/templates/ProductPage/CharacteristicsPage/CharacteristicsPage';

export default async function Characteristics({
  params,
}: {
  params: { item: string };
}) {
  const requiredItem = await getProductById(params.item);

  return (
    <>
      {requiredItem && (
        <ItemProductLayout data={requiredItem}>
          <CharacterisicsPage data={requiredItem} />
        </ItemProductLayout>
      )}
    </>
  );
}
