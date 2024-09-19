'use server';

import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import SubSubcategory from '@/models/SubSubcategory';
import { ICategory, ISubcategory, ISubSubcategory } from '@/types/category';
import { ILanguageStrings } from '@/types/constants';

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
  data: ICategory;
}> {
  try {
    const category: ICategory | null = await Category.findById(categoryId);
    if (!category) {
      return { msg: 'Category not found', status: 404, data: {} as ICategory };
    }

    const subcategories = await Subcategory.find({
      _id: { $in: category.subcategories },
    });

    return {
      msg: 'Category fetched successfully!',
      status: 200,
      data: {
        ...category.toObject(),
        subcategories: subcategories.map((subcategory) =>
          subcategory.toObject()
        ),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      msg: 'Failed to fetch category.',
      status: 500,
      data: {} as ICategory,
    };
  }
}

export async function getSubcategoryById(subcategoryId: string): Promise<{
  msg: string;
  status: number;
  data: ISubcategory;
}> {
  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return {
        msg: 'Subcategory not found',
        status: 404,
        data: {} as ISubcategory,
      };
    }

    const subSubcategories = await SubSubcategory.find({
      _id: { $in: subcategory.subSubcategories },
    });

    return {
      msg: 'Subcategory fetched successfully!',
      status: 200,
      data: {
        ...subcategory.toObject(),
        subSubcategories: subSubcategories.map((subSubcategory) =>
          subSubcategory.toObject()
        ),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      msg: 'Failed to fetch subcategory.',
      status: 500,
      data: {} as ISubcategory,
    };
  }
}

export async function getSubSubcategoriesByIds(ids: string[]): Promise<{
  msg: string;
  status: number;
  data: ISubSubcategory[];
}> {
  try {
    const subSubcategories = await SubSubcategory.find({ _id: { $in: ids } });
    return {
      msg: 'Sub-subcategories fetched successfully!',
      status: 200,
      data: subSubcategories,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to fetch sub-subcategories.', status: 500, data: [] };
  }
}

export async function createSubcategory(
  categoryId: string,
  subcategoryData: Omit<ISubcategory, 'subSubcategories'>
): Promise<{ msg: string; status: number; subcategory?: ISubcategory }> {
  try {
    // Create subcategory
    const subcategory = await Subcategory.create({
      ...subcategoryData,
      category: categoryId,
    });

    // Update a category by adding a new subcategory
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
    // Create subcategory
    const subSubcategory = await SubSubcategory.create({
      ...subSubcategoryData,
      subcategory: subcategoryId,
    });

    // Update a subcategory by adding a new subcategory
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
  data: ICategory[];
}> {
  try {
    const categoriesFound = await Category.find();

    const populatedCategories = await Promise.all(
      categoriesFound.map(async (category) => {
        const subcategories = await Subcategory.find({
          _id: { $in: category.subcategories },
        });

        return {
          _id: category._id.toString(), // Convert _id to string
          name: category.name.toObject(),
          imageUrl: category.imageUrl.toString(),
          subcategories: subcategories,
        };
      })
    );
    return {
      msg: 'All categories fetched successfully!',
      status: 200,
      data: [...populatedCategories],
    };
  } catch (error) {
    console.error(error);
    return {
      msg: 'Failed to fetch all categories.',
      status: 500,
      data: [],
    };
  }
}

export async function deleteSelectedCategories(
  selectedCategoryIds: string[]
): Promise<{ msg: string; status: number }> {
  try {
    // Delete each selected category
    const deletePromises = selectedCategoryIds.map(async (categoryId) => {
      // Find the category to get its subcategories
      const category = await Category.findById(categoryId);

      if (!category) {
        console.log(`Category with ID ${categoryId} not found.`);
        return;
      }

      // Delete subcategories and their sub-subcategories
      const subcategoryDeletePromises = category.subcategories.map(
        async (subcategoryId: string) => {
          const subcategory = await Subcategory.findById(subcategoryId);

          if (subcategory) {
            await SubSubcategory.deleteMany({
              _id: { $in: subcategory.subSubcategories },
            });
            await Subcategory.findByIdAndDelete(subcategoryId);
          }
        }
      );

      await Promise.all(subcategoryDeletePromises);

      // Finally, delete the category
      await Category.findByIdAndDelete(categoryId);

      console.log(`Category with ID ${categoryId} deleted successfully.`);
    });

    await Promise.all(deletePromises);

    return {
      msg: 'Selected categories deleted successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete selected categories.', status: 500 };
  }
}

export async function deleteSelectedSubcategories(
  selectedSubcategoryIds: string[]
): Promise<{ msg: string; status: number }> {
  try {
    // Delete each selected subcategory
    const deletePromises = selectedSubcategoryIds.map(async (subcategoryId) => {
      // Find the subcategory to get its sub-subcategories
      const subcategory = await Subcategory.findById(subcategoryId);

      if (!subcategory) {
        console.log(`Subcategory with ID ${subcategoryId} not found.`);
        return;
      }

      // Delete sub-subcategories
      await SubSubcategory.deleteMany({
        _id: { $in: subcategory.subSubcategories },
      });

      // Delete the subcategory
      await Subcategory.findByIdAndDelete(subcategoryId);

      // Update the parent category to remove the reference to the deleted subcategory
      await Category.findByIdAndUpdate(subcategory.category, {
        $pull: { subcategories: subcategoryId },
      });

      console.log(`Subcategory with ID ${subcategoryId} deleted successfully.`);
    });

    await Promise.all(deletePromises);

    return {
      msg: 'Selected subcategories deleted successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete selected subcategories.', status: 500 };
  }
}

export async function updateCategoryNameById(
  categoryId: string,
  newName: ILanguageStrings,
  imageUrl?: string
): Promise<{ msg: string; status: number }> {
  try {
    // Find the category by its ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return { msg: 'Category not found.', status: 404 };
    }

    // Update the language strings of the category name
    category.name.en = newName.en;
    category.name.ru = newName.ru;
    category.name.ua = newName.ua;

    if (imageUrl) {
      category.imageUrl = imageUrl;
    }

    // Save the updated category
    await category.save();

    return { msg: 'Category name updated successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to update category name.', status: 500 };
  }
}

export async function deleteSelectedSubSubCategories(
  selectedSubSubCategoryIds: string[]
): Promise<{ msg: string; status: number }> {
  try {
    // Deletes each selected subcategory of level 3
    const deletePromises = selectedSubSubCategoryIds.map(
      async (subSubcategoryId) => {
        // Find level 3 subcategory
        const subSubcategory = await SubSubcategory.findById(subSubcategoryId);

        if (!subSubcategory) {
          console.log(`SubSubcategory with ID ${subSubcategoryId} not found.`);
          return;
        }

        // Delete 3rd level subcategory
        await SubSubcategory.findByIdAndDelete(subSubcategoryId);

        // Update the parent subcategory to remove the link to the deleted level 3 subcategory
        await Subcategory.findByIdAndUpdate(subSubcategory.subcategory, {
          $pull: { subSubcategories: subSubcategoryId },
        });

        console.log(
          `SubSubcategory with ID ${subSubcategoryId} deleted successfully.`
        );
      }
    );

    await Promise.all(deletePromises);

    return {
      msg: 'Selected sub-subcategories deleted successfully!',
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete selected sub-subcategories.', status: 500 };
  }
}

export async function updateSubcategoryNameById(
  subcategoryId: string,
  newName: ILanguageStrings,
  imageUrl?: string
): Promise<{ msg: string; status: number }> {
  try {
    // Find the subcategory by its ID
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return { msg: 'Subcategory not found.', status: 404 };
    }

    // Update the language strings of the subcategory name
    subcategory.name.en = newName.en;
    subcategory.name.ru = newName.ru;
    subcategory.name.ua = newName.ua;
    if (imageUrl) {
      subcategory.imageUrl = imageUrl;
    }

    // Save the updated subcategory
    await subcategory.save();

    return { msg: 'Subcategory name updated successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to update subcategory name.', status: 500 };
  }
}

export async function updateSubSubcategoryById(
  subSubcategoryId: string,
  updateData: { ua: string; ru: string; en: string; description?: string },
  imageUrl?: string
): Promise<{ msg: string; status: number }> {
  try {
    // Find the sub-subcategory by its ID
    const subSubcategory = await SubSubcategory.findById(subSubcategoryId);
    console.log('updateData-backend:', updateData);

    if (!subSubcategory) {
      return { msg: 'SubSubcategory not found.', status: 404 };
    }

    // Update the name fields of the sub-subcategory
    subSubcategory.name.en = updateData.en;
    subSubcategory.name.ru = updateData.ru;
    subSubcategory.name.ua = updateData.ua;

    subSubcategory.description = updateData.description;
    if (imageUrl) {
      subSubcategory.imageUrl = imageUrl;
    }

    // Save the updated sub-subcategory
    await subSubcategory.save();

    return { msg: 'SubSubcategory updated successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to update subSubcategory.', status: 500 };
  }
}

export async function getSubSubCategories(): Promise<{
  msg: string;
  status: number;
  data: ISubSubcategory[];
}> {
  try {
    const subSubCategories = await SubSubcategory.find();
    return {
      msg: 'All sub-subcategories fetched successfully!',
      status: 200,
      data: subSubCategories.map((subSubcategory) => subSubcategory.toObject()),
    };
  } catch (error) {
    console.error(error);
    return {
      msg: 'Failed to fetch sub-subcategories.',
      status: 500,
      data: [],
    };
  }
}
