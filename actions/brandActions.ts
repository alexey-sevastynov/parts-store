'use server';

import Brand from '@/models/Brand';
import { IBrand } from '@/types/brand';

// Function to get all brands
export async function getAllBrands(): Promise<{
  msg: string;
  status: number;
  brands?: IBrand[];
}> {
  try {
    const brands = await Brand.find({});
    return { msg: 'Brands fetched successfully!', status: 200, brands };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to fetch brands.', status: 500 };
  }
}

// Function to get brand by ID
export async function getBrandById(
  brandId: string
): Promise<{ msg: string; status: number; brand?: IBrand }> {
  try {
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return { msg: 'Brand not found', status: 404 };
    }
    return { msg: 'Brand fetched successfully!', status: 200, brand };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to fetch brand.', status: 500 };
  }
}

// Function for creating a new brand
export async function createBrand(
  brandData: Omit<IBrand, '_id'>
): Promise<{ msg: string; status: number; brand?: IBrand }> {
  try {
    const brand = new Brand(brandData);
    await brand.save();
    return { msg: 'Brand created successfully!', status: 200, brand };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to create brand.', status: 500 };
  }
}

// Function for editing brand by ID
export async function updateBrandById(
  brandId: string,
  updateData: Partial<IBrand>
): Promise<{ msg: string; status: number; brand?: IBrand }> {
  try {
    const brand = await Brand.findByIdAndUpdate(brandId, updateData, {
      new: true,
    });
    if (!brand) {
      return { msg: 'Brand not found', status: 404 };
    }
    return { msg: 'Brand updated successfully!', status: 200, brand };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to update brand.', status: 500 };
  }
}

// Function to remove brand by ID
export async function deleteBrandById(
  brandId: string
): Promise<{ msg: string; status: number }> {
  try {
    const brand = await Brand.findByIdAndDelete(brandId);
    if (!brand) {
      return { msg: 'Brand not found', status: 404 };
    }
    return { msg: 'Brand deleted successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete brand.', status: 500 };
  }
}

// Function to delete selected brands by their IDs
export async function deleteSelectedBrands(
  selectedBrandIds: string[]
): Promise<{ msg: string; status: number }> {
  try {
    // Delete each selected brand
    const deletePromises = selectedBrandIds.map(async (brandId) => {
      const res = await deleteBrandById(brandId);
      if (res.status !== 200) {
        console.log(`Failed to delete brand with ID ${brandId}`);
      }
    });

    await Promise.all(deletePromises);

    return { msg: 'Selected brands deleted successfully!', status: 200 };
  } catch (error) {
    console.error('Failed to delete selected brands:', error);
    return { msg: 'Failed to delete selected brands.', status: 500 };
  }
}
