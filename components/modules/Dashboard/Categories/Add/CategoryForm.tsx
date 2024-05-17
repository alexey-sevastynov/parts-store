import { useForm } from 'react-hook-form';
import { ICategoryFormData } from '@/types/category';
import { createCategory } from '@/actions/categoryActions';
import React from 'react';

const CategoryForm: React.FC = () => {
  const { register, handleSubmit } = useForm<ICategoryFormData>();

  const onSubmit = async (data: ICategoryFormData) => {
    console.log(data.imageUrl);

    try {
      const response = await createCategory({
        name: {
          en: data.nameEn,
          ru: data.nameRu,
          ua: data.nameUa,
        },
        imageUrl: data.imageUrl,
      });

      console.log(response);

      if (response.status === 200) {
        console.log(response.msg); // Logic for a successful response
      } else {
        console.error(response.msg); // Logic for an unsuccessful response
      }
    } catch (error) {
      console.error(error);
      // Logic for handling an error if the request failed to execute
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

export default CategoryForm;