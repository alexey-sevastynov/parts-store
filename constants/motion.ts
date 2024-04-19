export const basePropsForMotionDropDown = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export const basePropsForMotionAsidePanel = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: {
    opacity: 0,
    x: -100,
  },
};
