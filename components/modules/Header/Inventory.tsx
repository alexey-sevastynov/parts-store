'use client';
import Styles from '@/styles/modules/header/index.module.scss';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { useLang } from '@/hooks/useLang';
import LinkIconDescription from '@/components/elements/LinkIconDescription';
import { useSession } from 'next-auth/react';

import DropDownCatalog from './DropDownCatalog/DropDownCatalog';
import useClickOutside from '@/hooks/useClickOutside';
import {
  closeDropDownAuth,
  closeDropDownCatalog,
  closeDropDownLang,
  openDropDownCatalog,
} from '@/context/features/modals/modals';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import PopupWindowCatalog from './DropDownCatalog/PopupWindowCatalog';
import { getCategories, getCategory } from '@/utils/dashboards';

const Inventory = () => {
  const dispatch = useAppDispatch();

  const { status } = useSession();

  const liRef = React.useRef<HTMLLIElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  const isOpenDropCatalog = useAppSelector(
    (state) => state.modals.isOpenDropCatalog
  );

  useClickOutside([divRef, liRef], () => {
    dispatch(closeDropDownCatalog());
    console.log('close');
  });

  const { lang, translations } = useLang();

  const isAuthenticated = status === 'authenticated';

  const handleShowDropCatalog = (): void => {
    dispatch(openDropDownCatalog());
    dispatch(closeDropDownLang());
    dispatch(closeDropDownAuth());
  };

  // Fetch all categories
  const { data: categories } = useSWR(
    'categories',
    () => getCategories().then((res) => res.data),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Fetch selected category when selectedCategoryId changes
  const getCategoryByIdWithFallback = (id: string) => {
    return useSWR(
      id ? ['category', id] : null,
      () =>
        getCategory(id).then((res) => {
          return res.data;
        }),
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );
  };

  return (
    <nav className={Styles.header__inventory}>
      {/*show window popup catalog only if window width < 768px */}
      {isOpenDropCatalog && categories && (
        <PopupWindowCatalog
          ref={divRef}
          categories={categories}
          getCategoryByIdWithFallback={getCategoryByIdWithFallback}
        />
      )}

      <ul className={Styles.header__inventory_list}>
        <li
          className={Styles.header__inventory_list_category}
          ref={liRef}
          onClick={handleShowDropCatalog}
        >
          {/* show drop down catalog only if window width > 768px */}
          {categories && (
            <DropDownCatalog
              categories={categories}
              getCategoryByIdWithFallback={getCategoryByIdWithFallback}
            />
          )}
        </li>

        {isAuthenticated && (
          <li className={Styles.header__inventory_list_auto}>
            <LinkIconDescription imageName='auto' href={'/auto'} color='light'>
              {translations[lang].header.auto}
            </LinkIconDescription>
          </li>
        )}

        <li className={Styles.header__inventory_list_sale}>
          <Link href={'/sale'}> {translations[lang].header.sale}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Inventory;
