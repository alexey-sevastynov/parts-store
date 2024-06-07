'use server';

import Product from '@/models/Product';
import { IProduct } from '@/types/goods';
import mongoose from 'mongoose';

// Функция для получения всех товаров
export async function getAllProducts(): Promise<{
  msg: string;
  status: number;
  products?: IProduct[];
}> {
  try {
    const products = await Product.find({});
    return { msg: 'Products fetched successfully!', status: 200, products };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to fetch products.', status: 500 };
  }
}

// Функция для получения товара по ID
export async function getProductById(
  productId: string
): Promise<{ msg: string; status: number; product?: IProduct }> {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return { msg: 'Product not found', status: 404 };
    }
    return { msg: 'Product fetched successfully!', status: 200, product };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to fetch product.', status: 500 };
  }
}

// Функция для создания нового товара
export async function createProduct(
  productData: Omit<IProduct, '_id'>
): Promise<{ msg: string; status: number; product?: IProduct }> {
  try {
    const product = new Product(productData);
    await product.save();
    return { msg: 'Product created successfully!', status: 200, product };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to create product.', status: 500 };
  }
}

// Функция для редактирования товара по ID
export async function updateProductById(
  productId: string,
  updateData: Partial<IProduct>
): Promise<{ msg: string; status: number; product?: IProduct }> {
  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
    if (!product) {
      return { msg: 'Product not found', status: 404 };
    }
    return { msg: 'Product updated successfully!', status: 200, product };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to update product.', status: 500 };
  }
}

// Функция для удаления товара по ID
export async function deleteProductById(
  productId: string
): Promise<{ msg: string; status: number }> {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return { msg: 'Product not found', status: 404 };
    }
    return { msg: 'Product deleted successfully!', status: 200 };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to delete product.', status: 500 };
  }
}

// Функция для удаления выбранных товаров по их ID
export async function deleteSelectedProducts(
  selectedProductIds: string[]
): Promise<{ msg: string; status: number }> {
  try {
    // Удаление каждого выбранного товара
    const deletePromises = selectedProductIds.map(async (productId) => {
      const res = await deleteProductById(productId);
      if (res.status !== 200) {
        console.log(`Failed to delete product with ID ${productId}`);
      }
    });

    await Promise.all(deletePromises);

    return { msg: 'Selected products deleted successfully!', status: 200 };
  } catch (error) {
    console.error('Failed to delete selected products:', error);
    return { msg: 'Failed to delete selected products.', status: 500 };
  }
}
