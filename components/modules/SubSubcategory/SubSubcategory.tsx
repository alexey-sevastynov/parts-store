import Styles from '@/styles/modules/subcategory/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';
import { ISubSubCategoryProps } from '@/types/subcategory';

import CategoryOverviewCard from '@/components/elements/CategoryOverviewCard';
import Title from '@/components/elements/Title';

const SubSubcategory = ({ title, data }: ISubSubCategoryProps) => {
  const { lang } = useLang();

  return (
    <section className={Styles.subcategory}>
      <div className={Styles.subcategory__title}>
        <Title>{title}</Title>
      </div>

      <div className={Styles.subcategory__list}>
        {data.subSubcategories.map((subcategory) => {
          console.log(subcategory);

          return (
            <CategoryOverviewCard
              key={subcategory._id}
              title={subcategory.name[lang]}
              description={subcategory.description}
              hrefImage={subcategory.imageUrl}
              hrefLink={'/'}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SubSubcategory;
