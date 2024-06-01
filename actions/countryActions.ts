'use server';

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
