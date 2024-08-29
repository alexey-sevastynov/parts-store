import Styles from '@/styles/modules/subcategory/index.module.scss';

import React from 'react';
import useSWR, { SWRResponse } from 'swr';

import { useLang } from '@/hooks/useLang';
import { getAllSubSubCategoriesByIds } from '@/utils/dashboards';

import { ROUTES } from '@/constants/common';
import { AllowedLangs } from '@/constants/lang';

import { ILanguageStrings } from '@/types/constants';
import { ISubcategoryProps } from '@/types/subcategory';

import CategoryOverviewCard from '@/components/elements/CategoryOverviewCard';
import Title from '@/components/elements/Title';



const Subcategory = ({ title, data }: ISubcategoryProps) => {
  const { lang } = useLang();

  const getTranslatedStrings = (
    items: ILanguageStrings[],
    language: AllowedLangs
  ): string => {
    if (!items) return '';
    return items.map((item) => item[language]).join(', ');
  };

  return (
    <section className={Styles.subcategory}>
      <div className={Styles.subcategory__title}>
        <Title>{title}</Title>
      </div>

      <div className={Styles.subcategory__list}>
        {data.subcategories.map((subcategory) => {
          const subSubcategoryIds: any = subcategory.subSubcategories.map(
            (subcategory) => subcategory
          );

          const {
            data: [subSubCategories],
            error,
            isLoading,
          }: SWRResponse = useSWR(
            subSubcategoryIds.length > 0
              ? ['subSubcategories', subSubcategoryIds]
              : null,
            () => getAllSubSubCategoriesByIds(subSubcategoryIds),
            {
              revalidateIfStale: false,
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
            }
          );

          if (error) {
            return (
              <div key={subcategory._id}>Failed to load subcategories.</div>
            );
          }

          const listNamesSubcategories =
            subSubCategories?.subSubcategories?.map(
              (subSubCategory: any) => subSubCategory.name
            );
          const translationStrSubSubcategories: string = getTranslatedStrings(
            listNamesSubcategories || '',
            lang
          );

          return isLoading ? (
            <div key={subcategory._id}>Loading...</div>
          ) : (
            <CategoryOverviewCard
              key={subcategory._id}
              title={subcategory.name[lang]}
              description={translationStrSubSubcategories}
              hrefImage={subcategory.imageUrl}
              hrefLink={ROUTES.VIEW_SUBCATEGORY_BY_ID(
                data.name.en,
                subcategory.name.en,
                data._id as string,
                subcategory._id as string
              )}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Subcategory;
