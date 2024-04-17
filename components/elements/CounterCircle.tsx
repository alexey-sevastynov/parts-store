import Styles from '@/styles/elements/index.module.scss';

interface ICounterCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  counter: number;
}

const CounterCircle = ({
  counter,
  className,
  ...props
}: ICounterCircleProps) => {
  return (
    <div className={`${Styles.counterCircle} ${className}`} {...props}>
      <p className={Styles.counterCircle__text}>{counter}</p>
    </div>
  );
};

export default CounterCircle;
