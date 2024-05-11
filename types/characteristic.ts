export interface ICharacteristics {
  _id?: string;
  name: {
    _id?: string;
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
