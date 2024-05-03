import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ItemInfoLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={222}
    height={31}
    viewBox='0 0 222 31'
    backgroundColor='#c6c6c6'
    foregroundColor='#e5e5e5'
    {...props}
  >
    <rect x='0' y='0' rx='1' ry='1' width={'40%'} height='12' />
    <rect x='0' y='17' rx='1' ry='1' width={'90%'} height='15' />
  </ContentLoader>
);

export default ItemInfoLoader;
