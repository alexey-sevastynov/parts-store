export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement;
  body.classList.remove('overflow-hidden');
};

export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement;
  body.classList.add('overflow-hidden');

  paddingRight && (body.style.paddingRight = paddingRight);
};

export function parseNameString(fullName: string) {
  const parts = fullName.split(' ');

  if (parts.length !== 2) {
    throw new Error(
      'Incorrect string format. First and last name was expected. Checkout function parseNameString()'
    );
  }

  return {
    firstName: parts[0],
    lastName: parts[1],
  };
}

export function extractLastFiveCharacters(idMongoDB: string): string {
  const digits = idMongoDB.replace(/\D/g, ''); // Just keep the numbers
  const lastFiveDigits = digits.slice(-5);

  if (lastFiveDigits.length < 5) {
    throw new Error(
      `String: "${idMongoDB}", should contain at least 5 digits .`
    );
  }

  return lastFiveDigits;
}

export const getWindowWidth = () => {
  let windowWidth = 0;

  if (typeof window !== 'undefined') {
    windowWidth = window.innerWidth;
  }

  return { windowWidth };
};
