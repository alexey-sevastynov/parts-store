export interface ICharacteristics {
  _id?: string;
  name: {
    en: string;
    ru: string;
    ua: string;
  };
  values: {
    _id?: string;
    en: string;
    ru: string;
    ua: string;
  }[];
}
