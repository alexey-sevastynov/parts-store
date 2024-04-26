import Styles from '@/styles/elements/index.module.scss';
import ProductsItem from './ProductsItem';
import { TypeListProducts } from '@/types/elements';
import React from 'react';
import { BREAKPOINTS } from '@/constants/breakpoints';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MAX_VALUE_ITEMS } from '@/constants/common';

const ProductsList = ({
  items,
  numberItems = 6,
}: {
  items: TypeListProducts;
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

  return (
    <ul
      className={`${Styles.productsList} ${showMoreItem || items.length < 7 ? Styles.wrap : ''}`}
    >
      {_items.map((product) => {
        return (
          <ProductsItem
            key={product.id}
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
