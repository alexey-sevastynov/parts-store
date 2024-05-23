import Styles from '@/styles/modules/dashboard/index.module.scss';
import { ICategory, ISubSubcategory, ISubcategory } from '@/types/category';
import NotFoundMsg from '../NotFoundMsg';
import React, { Dispatch, SetStateAction } from 'react';
import { useLang } from '@/hooks/useLang';
import CategoryItem from './CategoryItem/CategoryItem';
import CategoryItemLoading from './CategoryItem/CategoryItemLoading';
import { deleteSelectedSubSubCategories } from '@/actions/categoryActions';

const CategoriesList = ({
  data,
  updateListData,
  isLoading = true,
  handleDelete,
  selectedCheckboxes,
  setSelectedCheckboxes,
  idCategory,
  handleEditSubmit,
}: {
  data: ICategory[] | ISubcategory[] | ISubSubcategory[];
  updateListData: () => void;
  isLoading: boolean;
  handleDelete: (item: string) => void;
  selectedCheckboxes: {
    [key: string]: boolean;
  };
  setSelectedCheckboxes: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  idCategory?: string;
  handleEditSubmit: (
    id: string,
    updatedData: { ua: string; ru: string; en: string; descrtiption?: string }
  ) => Promise<void>;
}) => {
  const { lang, translations } = useLang();

  const handleCheckboxChange = (userId: string) => {
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      [userId]: !selectedCheckboxes[userId],
    });
  };

  return (
    <>
      {isLoading ? (
        <ul className={Styles.categoriesList}>
          <p>isLoading</p>
          {[...Array(6)].map((_, id) => (
            <CategoryItemLoading key={id} />
          ))}
        </ul>
      ) : (
        <ul className={Styles.categoriesList}>
          {data
            .slice()
            .reverse()
            .map((item: ICategory | ISubcategory | ISubSubcategory) => (
              <CategoryItem
                key={item._id}
                isChecked={selectedCheckboxes[item._id as string] || false}
                handleCheckboxChange={handleCheckboxChange}
                handleDelete={handleDelete}
                handleEditSubmit={handleEditSubmit}
                idCategory={idCategory}
                {...item}
              />
            ))}
        </ul> // if not, than show the message "not found"
      )}
    </>
  );
};

export default CategoriesList;
