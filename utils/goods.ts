import { IBrand } from '@/types/brand';
import { ILanguageStrings } from '@/types/constants';
import {
  IProductInputs,
  OptionBrandType,
  OptionCategoryType,
} from '@/types/goods';
import { RegisterOptions } from 'react-hook-form';

export const nameValidationRules = (
  messageMinLength: string,
  messageMaxLength: string,
  requireMessage?: string
) => ({
  ...(requireMessage && { required: requireMessage }),
  minLength: { value: 4, message: messageMinLength },
  maxLength: { value: 80, message: messageMaxLength },
});

export const brandValidationRules = (
  requireMessage?: string
): RegisterOptions<IProductInputs, 'brand'> => ({
  validate: (value: OptionBrandType | { value: IBrand; label: string }[]) => {
    if (Array.isArray(value)) {
      return value.length > 0 || requireMessage || 'Please select a brand';
    }
    return !!value || requireMessage || 'Please select a brand';
  },
});

export const categoryValidationRules = (
  requireMessage?: string
): RegisterOptions<IProductInputs, 'category'> => ({
  validate: (value: OptionCategoryType | OptionCategoryType[]) => {
    if (Array.isArray(value)) {
      return value.length > 0 || requireMessage || 'Please select a brand';
    }
    return !!value || requireMessage || 'Please select a brand';
  },
});

export const codeProductValidationRules = (requireMessage?: string) => ({
  required: requireMessage || 'Please select a code product',
  validate: (sku: string) => sku.length > 0 || 'Please select a code product',
});

export const priceProductValidationRules = (requireMessage?: string) => ({
  required: requireMessage || 'Please select a price product',
  validate: (price: number) => price > 0 || 'Please select a price product',
});

export const quantityAvailableValidationRules = (requireMessage?: string) => ({
  required: requireMessage || 'Please input a quantity available',
  validate: (quantityAvailable: number) =>
    quantityAvailable >= 0 || 'Please input a quantity available',
});

export async function getCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const countriesWithTranslations = countries.map((country: any) => ({
      name: {
        en: country.name.common,
        ru: country.translations.rus.common,
        ua: country.translations.rus.common,
      },
    }));
    return countriesWithTranslations;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}
