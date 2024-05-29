import {
  getCategoryById,
  getSubSubcategoriesByIds,
} from '@/actions/categoryActions';
import CategoryOverviewCard from '@/components/elements/CategoryOverviewCard';
import Title from '@/components/elements/Title';
import { AllowedLangs } from '@/constants/lang';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/subcategory/index.module.scss';
import { ILanguageStrings } from '@/types/constants';
import { ISubcategoryProps } from '@/types/subcategory';
import React from 'react';
import useSWR, { SWRResponse } from 'swr';

const fetchSubSubcategories = (ids: string[]) => getSubSubcategoriesByIds(ids);

const Subcategory = ({ title, data }: ISubcategoryProps) => {
  const { lang, translations } = useLang();

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
            data: subSubCategories,
            error,
            isLoading,
          }: SWRResponse = useSWR(
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
              hrefLink='/'
            />
          );
        })}
      </div>
    </section>
  );
};

export default Subcategory;
