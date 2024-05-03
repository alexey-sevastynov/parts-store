import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ItemInfoPhotoLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={169}
    height={96}
    viewBox='0 0 169 96'
    backgroundColor='#c6c6c6'
    foregroundColor='#e5e5e5'
    {...props}
  >
    <circle cx='48' cy='48' r='48' />
    <rect x='126' y='19' rx='1' ry='1' width='38' height='14' />
    <rect x='126' y='0' rx='1' ry='1' width='38' height='12' />
  </ContentLoader>
);

export default ItemInfoPhotoLoader;
