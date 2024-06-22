import Styles from '@/styles/elements/index.module.scss';
import ProductsItem from './ProductsItem';

import React from 'react';

import { MAX_VALUE_ITEMS } from '@/constants/common';
import { IProduct } from '@/types/goods';

const ProductsList = ({
  items,
  numberItems = 6,
}: {
  items: IProduct[];
  numberItems?: number;
}) => {
  const [showMoreItem, setShowMoreItem] = React.useState<boolean>(false);
  const [visibleItemCount, setVisibleItemCount] =
    React.useState<number>(numberItems);

  const _items = showMoreItem
    ? items.slice(0, MAX_VALUE_ITEMS)
    : items.slice(0, visibleItemCount);

  React.useEffect(() => {
    if (items.length < 7) setShowMoreItem(true);
  });

  if (items.length === 0) return <p>Nothing</p>;

  return (
    <ul
      className={`${Styles.productsList} ${showMoreItem || items.length < 7 ? Styles.wrap : ''}`}
    >
      {_items.map((product) => {
        return (
          <ProductsItem
            item={product}
            lengthItems={items.length}
            showMoreItem={showMoreItem}
            setShowMoreItem={setShowMoreItem}
          />
        );
      })}
    </ul>
  );
};

export default ProductsList;
