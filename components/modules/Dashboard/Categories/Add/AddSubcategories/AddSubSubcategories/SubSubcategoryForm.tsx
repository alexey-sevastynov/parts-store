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
      <div>
        <label htmlFor='description'>description</label>
        <textarea id='description' {...register('description')} />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default SubSubcategoryForm;
