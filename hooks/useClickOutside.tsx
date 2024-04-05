import { useEffect, RefObject } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [ref, callback]);
}

export default useClickOutside;

//______template for using to component

// useClickOutside(dropdownRef, () => {
//   setOpen(false);
//   dispatch(closeDropDownAuth());
// });
