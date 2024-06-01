import { StylesConfig, Theme, ThemeConfig } from 'react-select';
import { COLORS } from './colors';

export const customSelectStyles: StylesConfig = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: 7,
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    svg: {
      fill: COLORS.grey,
    },
  }),
};
