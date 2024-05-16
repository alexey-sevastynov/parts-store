import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import { ISubcategory } from '@/types/category';

import Link from 'next/link';
import { ROUTES } from '@/constants/common';

const ListAddedSubcategories = ({
  data,
  idSubcategory,
}: {
  data: ISubcategory[];
  idSubcategory?: string;
}) => {
  const { lang, translations } = useLang();

  const [listSubategory, setListSubcategory] =
    React.useState<ISubcategory[]>(data);

  return (
    <div className={Styles.listAddedCharacteristics}>
      <Title size='sm' className={Styles.listAddedCharacteristics__title}>
        {translations[lang].dashboard_page.list_added_characteristics}
      </Title>

      {listSubategory && idSubcategory && (
        <ul>
          {listSubategory?.map(({ _id, name, imageUrl }) => (
            <li key={_id}>
              {_id && (
                <Link
                  href={ROUTES.VIEW_SUB_SUBCATEGORIES_ADD_BY_ID(
                    idSubcategory,
                    _id
                  )}
                >
                  {_id}
                </Link>
              )}

              <p>english text: {name.en}</p>
              <p>russian text: {name.ru}</p>
              <p>ukraine text: {name.ua}</p>
              <p>image URL: {imageUrl}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListAddedSubcategories;
