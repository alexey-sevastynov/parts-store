import { useEffect, RefObject } from 'react';

function useClickOutside(
  refs: (RefObject<HTMLDivElement> | RefObject<HTMLLIElement>)[],
  callback: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      // Check that the click was made outside of all passed elements
      const isClickOutside = refs.every((ref) => {
        if (ref.current) {
          if (ref.current.contains(event.target as Node)) {
            return false;
          }
        }
        return true;
      });

      if (isClickOutside) {
        callback();
      }
    }

    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [refs, callback]);
}

export default useClickOutside;
