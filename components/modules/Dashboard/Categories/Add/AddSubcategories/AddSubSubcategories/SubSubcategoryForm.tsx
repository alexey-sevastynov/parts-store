// SubSubcategoryForm.tsx
import { createSubSubcategory } from '@/actions/categoryActions';
import {
  ISubSubcategoryFormData,
  ISubSubcategoryFormProps,
} from '@/types/category';
import React from 'react';
import { useForm } from 'react-hook-form';

const SubSubcategoryForm: React.FC<ISubSubcategoryFormProps> = ({
  subcategoryId,
}) => {
  const { register, handleSubmit } = useForm<ISubSubcategoryFormData>();

  const onSubmit = async (data: ISubSubcategoryFormData) => {
    try {
      const response = await createSubSubcategory(subcategoryId, {
        name: {
          en: data.nameEn,
          ru: data.nameRu,
          ua: data.nameUa,
        },
        imageUrl: data.imageUrl,
        description: data.description || '',
      });
      if (response.status === 200) {
        console.log(response.msg);
      } else {
        console.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register('nameEn')} />
      <input type='text' {...register('nameRu')} />
      <input type='text' {...register('nameUa')} />
      <input type='text' {...register('imageUrl')} />
      <input type='text' {...register('description')} />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default SubSubcategoryForm;
