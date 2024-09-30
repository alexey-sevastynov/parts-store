import Styles from '@/styles/elements/index.module.scss';
import React from 'react';
import { MAX_VALUE_ITEMS } from '@/constants/common';
import { IProduct } from '@/types/goods';
import ProductsItem from './ProductsItem';

const ProductsList = ({
  items,
  numberItems = 6,
}: {
  items: IProduct[];
  numberItems?: number;
}) => {
  const [showMoreItem, setShowMoreItem] = React.useState<boolean>(false);

  const products = showMoreItem
    ? items.slice(0, MAX_VALUE_ITEMS)
    : items.slice(0, numberItems);

  React.useEffect(() => {
    if (items.length < 7) setShowMoreItem(true);
  }, [items, items.length]);

  if (items.length === 0) return <p>Nothing</p>;

  return (
    <ul
      className={`${Styles.productsList} ${showMoreItem || items.length < 7 ? Styles.wrap : ''}`}
    >
      {products.map((product) => {
        return (
          <ProductsItem
            key={product._id!}
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
