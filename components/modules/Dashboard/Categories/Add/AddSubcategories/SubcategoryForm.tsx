// SubcategoryForm.tsx
import { createSubcategory } from '@/actions/categoryActions';
import { ISubcategoryFormData, ISubcategoryFormProps } from '@/types/category';

import React from 'react';
import { useForm } from 'react-hook-form';

const SubcategoryForm: React.FC<ISubcategoryFormProps> = ({ categoryId }) => {
  const { register, handleSubmit } = useForm<ISubcategoryFormData>();

  const onSubmit = async (data: ISubcategoryFormData) => {
    try {
      const response = await createSubcategory(categoryId, {
        name: {
          en: data.nameEn,
          ru: data.nameRu,
          ua: data.nameUa,
        },
        imageUrl: data.imageUrl,
      });

      if (response.status === 200) {
        console.log(response.msg); // Логика для успешного ответа
      } else {
        console.error(response.msg); // Логика для неуспешного ответа
      }
    } catch (error) {
      console.error(error);
      // Логика для обработки ошибки, если запрос не удалось выполнить
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='nameEn'>English name</label>
        <input type='text' id='nameEn' {...register('nameEn')} />
      </div>
      <div>
        <label htmlFor='nameRu'>Russian name</label>
        <input type='text' id='nameRu' {...register('nameRu')} />
      </div>
      <div>
        <label htmlFor='nameUa'>Ukraine name</label>
        <input type='text' id='nameUa' {...register('nameUa')} />
      </div>
      <div>
        <label htmlFor='imageUrl'>Icon Url svg</label>
        <input type='text' id='imageUrl' {...register('imageUrl')} />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default SubcategoryForm;
