'use server';

import Brand from '@/models/Brand';
import Characteristic from '@/models/Characteristic';
import CharacteristicValue from '@/models/CharacteristicValue';
import Product from '@/models/Product';
import SubSubcategory from '@/models/SubSubcategory';
import Subcategory from '@/models/Subcategory';
import Test from '@/models/Test';
import { ICharacteristics } from '@/types/characteristic';
import { IProduct, ITest } from '@/types/goods';
import { chain } from 'lodash';

// Функция для получения всех товаров
export async function getAllProducts(): Promise<{
  msg: string;
  status: number;
  products?: IProduct[];
}> {
  try {
    const products = await Product.find();

    const populatedProducts = await Promise.all(
      products.map(async (product) => {
        const brand = await Brand.findById(product.brand);
        const category = await SubSubcategory.findById(product.category);
        const characteristics = await Promise.all(
          product.characteristics.map(async (char: any) => {
            const nameCharacteristic = await Characteristic.findById(char.name);
            const valueCharacteristic = await CharacteristicValue.findById(
              char.value
            );
            return {
              name: nameCharacteristic
                ? nameCharacteristic.toObject()
                : `unknown getAllProducts, char.name: ${char.name}, char.value: ${char.value}, nameCharacteristic: ${nameCharacteristic}, valueCharacteristic: ${valueCharacteristic}, char: ${char}`,
              value: valueCharacteristic
                ? valueCharacteristic.toObject()
                : 'unknown getAllProducts',
            };
          })
        );

        const res = {
          ...product.toObject(),
          category,
          brand,
          characteristics,
        };

        return res;
      })
    );
    console.log('Products fetched:', populatedProducts);
    return {
      msg: 'Products fetched successfully!',
      status: 200,
      products: populatedProducts,
    };
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

    const brand = await Brand.findById(product.brand);
    const category = await SubSubcategory.findById(product.category);
    const characteristics = await Promise.all(
      product.characteristics.map(async (char: any) => {
        const nameCharacteristic = await Characteristic.findById(char.name);
        const valueCharacteristic = await CharacteristicValue.findById(
          char.value
        );
        return {
          name: nameCharacteristic
            ? nameCharacteristic.toObject()
            : 'unknown getProductById',
          value: valueCharacteristic
            ? valueCharacteristic.toObject()
            : 'unknown getProductById',
        };
      })
    );

    const populatedProduct = {
      ...product.toObject(),
      category,
      brand,
      characteristics,
    };

    return {
      msg: 'Product fetched successfully!',
      status: 200,
      product: populatedProduct,
    };
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
    console.log('Product fetched:', product);
    await product.save();
    return { msg: 'Product created successfully!', status: 200, product };
  } catch (error) {
    console.error(error);
    return { msg: 'Failed to create product.', status: 500 };
  }
}

export async function createTestProduct(
  productData: Omit<ITest, '_id'>
): Promise<{ msg: string; status: number; product?: ITest }> {
  try {
    const product = await new Test(productData);
    console.log('Product fetched:', product);
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
    const product = await Product.findByIdAndUpdate(productId, updateData);

    if (!product) {
      return { msg: 'Product not found', status: 404 };
    }

    const brand = await Brand.findById(product.brand);
    const category = await SubSubcategory.findById(product.category);
    const characteristics = await Promise.all(
      product.characteristics.map(async (char: any) => {
        const nameCharacteristic = await Characteristic.findById(char.name);
        const valueCharacteristic = await CharacteristicValue.findById(
          char.value
        );
        return {
          name: nameCharacteristic
            ? nameCharacteristic.toObject()
            : 'unknown updateProductById',
          value: valueCharacteristic
            ? valueCharacteristic.toObject()
            : 'unknown updateProductById',
        };
      })
    );

    const populatedProduct = {
      ...product.toObject(),
      category,
      brand,
      characteristics,
    };

    return {
      msg: 'Product updated successfully!',
      status: 200,
      product: populatedProduct,
    };
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
