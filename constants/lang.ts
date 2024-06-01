export enum AllowedLangs {
  ua = 'ua',
  ru = 'ru',
  en = 'en',
}

export const defaultLang = AllowedLangs.ua;

export const AllowedLangsArray = Object.values(AllowedLangs) as AllowedLangs[];
