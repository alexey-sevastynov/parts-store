import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ButtonLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={170}
    height={40}
    viewBox='0 0 170 40'
    backgroundColor='#c6c6c6'
    foregroundColor='#e5e5e5'
    {...props}
  >
    <rect x='0' y='0' rx='1' ry='1' width='170' height='40' />
  </ContentLoader>
);

export default ButtonLoader;
