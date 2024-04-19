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

const ListCategories = () => {
  const { lang, translations } = useLang();

  return (
    <ul className={Styles.listCategories}>
      <ItemCategory
        icon={<MdCarRepair size={SIZE_ICON} />}
        title={translations[lang].categories.spare_parts_for_service}
      />
      <ItemCategory
        icon={<RiOilLine size={SIZE_ICON} />}
        title={translations[lang].categories.oil_fluid_and_autochemistry}
      />
      <ItemCategory
        icon={<GiCartwheel size={SIZE_ICON} />}
        title={translations[lang].categories.tires_and_wheels}
      />
      <ItemCategory
        icon={<FaRegLightbulb size={SIZE_ICON} />}
        title={translations[lang].categories.lighting}
      />
      <ItemCategory
        icon={<MdElectricCar size={SIZE_ICON} />}
        title={translations[lang].categories.audio_and_electronics}
      />
      <ItemCategory
        icon={<BsTools size={SIZE_ICON} />}
        title={translations[lang].categories.tools_and_equipment}
      />
      <ItemCategory
        icon={<IoCarSharp size={SIZE_ICON} />}
        title={translations[lang].categories.exterior}
      />
      <ItemCategory
        icon={<IoCarOutline size={SIZE_ICON} />}
        title={translations[lang].categories.interior}
      />
    </ul>
  );
};

export default ListCategories;
