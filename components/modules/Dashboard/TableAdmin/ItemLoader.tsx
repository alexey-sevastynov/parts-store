import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ItemLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={100}
    height={20}
    viewBox='0 0 100 20'
    backgroundColor='#c6c6c6'
    foregroundColor='#e5e5e5'
    {...props}
  >
    <rect x='0' y='0' rx='1' ry='1' width='100%' height='20' />
  </ContentLoader>
);

export default ItemLoader;
