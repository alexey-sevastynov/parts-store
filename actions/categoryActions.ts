'use server';

import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import SubSubcategory from '@/models/SubSubcategory';
import { ICategory, ISubcategory, ISubSubcategory } from '@/types/category';

export async function createCategory(
  categoryData: Omit<ICategory, 'subcategories'>
): Promise<{ msg: string; status: number; category?: ICategory }> {
  try {
    const category = new Category(categoryData);
    await category.save();
    return { msg: 'Category created successfully!', status: 200, category };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to create category.', status: 500 };
  }
}

export async function getCategoryById(categoryId: string): Promise<{
  msg: string;
  status: number;
  category?: ICategory;
}> {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return { msg: 'Category not found', status: 404 };
    }

    const subcategories = await Subcategory.find({
      _id: { $in: category.subcategories },
    });

    return {
      msg: 'Category fetched successfully!',
      status: 200,
      category: { ...category.toObject(), subcategories },
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to fetch category.', status: 500 };
  }
}

export async function getSubcategoryById(subcategoryId: string): Promise<{
  msg: string;
  status: number;
  subcategory?: ISubcategory;
}> {
  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return { msg: 'Subcategory not found', status: 404 };
    }

    const subSubcategories = await SubSubcategory.find({
      _id: { $in: subcategory.subSubcategories },
    });

    return {
      msg: 'Subcategory fetched successfully!',
      status: 200,
      subcategory: { ...subcategory.toObject(), subSubcategories },
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to fetch subcategory.', status: 500 };
  }
}

export async function createSubcategory(
  categoryId: string,
  subcategoryData: Omit<ISubcategory, 'subSubcategories'>
): Promise<{ msg: string; status: number; subcategory?: ISubcategory }> {
  try {
    // Создаем подкатегорию
    const subcategory = await Subcategory.create({
      ...subcategoryData,
      category: categoryId,
    });

    // Обновляем категорию, добавляя новую подкатегорию
    await Category.findByIdAndUpdate(categoryId, {
      $push: { subcategories: subcategory._id },
    });

    return {
      msg: 'Subcategory created successfully!',
      status: 200,
      subcategory,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to create subcategory.', status: 500 };
  }
}

export async function createSubSubcategory(
  subcategoryId: string,
  subSubcategoryData: Omit<ISubSubcategory, 'subcategory'>
): Promise<{ msg: string; status: number; subSubcategory?: ISubSubcategory }> {
  try {
    // Создаем подподкатегорию
    const subSubcategory = await SubSubcategory.create({
      ...subSubcategoryData,
      subcategory: subcategoryId,
    });

    // Обновляем подкатегорию, добавляя новую подподкатегорию
    await Subcategory.findByIdAndUpdate(subcategoryId, {
      $push: { subSubcategories: subSubcategory._id },
    });

    return {
      msg: 'Sub-subcategory created successfully!',
      status: 200,
      subSubcategory,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to create sub-subcategory.', status: 500 };
  }
}

export async function getAllCategories(): Promise<{
  msg: string;
  status: number;
  categories?: ICategory[];
}> {
  try {
    const categoriesFound = await Category.find();

    const populatedCategories = await Promise.all(
      categoriesFound.map(async (category) => {
        const subcategories = await Subcategory.find({
          _id: { $in: category.subcategories },
        });

        return { ...category.toObject(), subcategories };
      })
    );
    return {
      msg: 'All categories fetched successfully!',
      status: 200,
      categories: populatedCategories,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: 'Failed to fetch all categories.',
      status: 500,
    };
  }
}
