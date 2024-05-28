import Styles from '@/styles/modules/header/index.module.scss';

import { getSubSubcategoriesByIds } from '@/actions/categoryActions';
import { useLang } from '@/hooks/useLang';
import { ISubcategory, ISubSubcategory } from '@/types/category';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetchSubSubcategories = (ids: string[]) => getSubSubcategoriesByIds(ids);

const ListSubSubCategories = ({
  subSubcategoryIds,
}: {
  subSubcategoryIds: string[];
}) => {
  const { lang, translations } = useLang();

  const { data, error } = useSWR(
    subSubcategoryIds.length > 0
      ? ['subSubcategories', subSubcategoryIds]
      : null,
    () => fetchSubSubcategories(subSubcategoryIds),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>Error loading sub-subcategories.</div>;
  if (!data) return <div>Loading sub-subcategories...</div>;

  return (
    <ul className={Styles.listSubSubcategories}>
      {data.subSubcategories &&
        subSubcategoryIds &&
        data.subSubcategories.map((subSubcategory: ISubSubcategory) => {
          return (
            <li
              key={subSubcategory._id}
              className={Styles.listSubSubcategories__item}
            >
              <Link
                className={Styles.listSubSubcategories__item_link}
                href={`/`}
              >
                {subSubcategory.name[lang]}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default ListSubSubCategories;
