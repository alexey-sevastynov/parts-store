import Styles from '@/styles/elements/index.module.scss';

import { IIconWithTitleCounterProps } from '@/types/elements';

import CounterCircle from '@/components/elements/CounterCircle';

const IconWithTitleCounter = ({
  image,
  text,
  counter,
}: IIconWithTitleCounterProps) => {
  return (
    <div className={Styles.iconWithTitleCounter}>
      {image}
      <p className={Styles.iconWithTitleCounter__text}>{text}</p>
      {counter && (
        <CounterCircle
          counter={counter}
          className={Styles.iconWithTitleCounter__counter}
        />
      )}
    </div>
  );
};

export default IconWithTitleCounter;
