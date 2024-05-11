import React from 'react';

import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export const CheckboxLoader = (props: IContentLoaderProps) => {
  return (
    <ContentLoader
      speed={1}
      width={13}
      height={13}
      viewBox='0 0 13 13'
      backgroundColor='#c6c6c6'
      foregroundColor='#e5e5e5'
      {...props}
    >
      <rect x='0' y='0' rx='1' ry='1' width='100%' height='13' />
    </ContentLoader>
  );
};
