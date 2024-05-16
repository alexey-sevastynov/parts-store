import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import { ISubSubcategory, ISubcategory } from '@/types/category';

import Link from 'next/link';
import { ROUTES } from '@/constants/common';

const ListAddedSubSubcategories = ({
  data,
  idSubcategory,
}: {
  data: ISubSubcategory[];
  idSubcategory?: string;
}) => {
  const { lang, translations } = useLang();

  const [listSubSubategory, setListSubSubcategory] =
    React.useState<ISubSubcategory[]>(data);

  return (
    <div className={Styles.listAddedCharacteristics}>
      <Title size='sm' className={Styles.listAddedCharacteristics__title}>
        {translations[lang].dashboard_page.list_added_characteristics}
      </Title>

      {listSubSubategory && idSubcategory && (
        <ul>
          {listSubSubategory?.map(({ _id, name, imageUrl, description }) => (
            <li key={_id}>
              <p>english text: {name.en}</p>
              <p>russian text: {name.ru}</p>
              <p>ukraine text: {name.ua}</p>
              <p>image URL: {imageUrl}</p>
              <p>description: {description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListAddedSubSubcategories;
