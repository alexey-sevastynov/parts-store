import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IWrappedComponentProps } from '@/types/hocs';
import { useAppDispatch } from '@/context/hooks';
import { closeDropDownAuth } from '@/context/features/modals/modals';

export function withClickOutside(
  WrappedComponent: ForwardRefExoticComponent<
    IWrappedComponentProps & RefAttributes<HTMLDivElement>
  >
) {
  const Component = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setOpen(false);

      const handleClickOutside = (e: MouseEvent) => {
        if (
          componentRef.current &&
          !componentRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
          dispatch(closeDropDownAuth());
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <WrappedComponent open={open} setOpen={setOpen} ref={componentRef} />
    );
  };

  return Component;
}
