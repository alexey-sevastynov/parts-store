import Styles from '@/styles/modules/main-page/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { SIZE_ICON } from '@/constants/common';

import { MdCarRepair, MdElectricCar } from 'react-icons/md';

import ItemCategory from './ItemCategory';
import { RiOilLine } from 'react-icons/ri';
import { GiCartwheel } from 'react-icons/gi';
import { FaRegLightbulb } from 'react-icons/fa6';
import { BsTools } from 'react-icons/bs';
import { IoCarOutline, IoCarSharp } from 'react-icons/io5';
import { ICategory } from '@/types/category';

const ListCategories = ({ categories }: { categories: ICategory[] }) => {
  const { lang, translations } = useLang();

  return (
    <ul className={Styles.listCategories}>
      {categories.map((category) => (
        <ItemCategory
          icon={category.imageUrl}
          title={category.name[lang]}
          href='/'
          isWithArrow
        />
      ))}
    </ul>
  );
};

export default ListCategories;
