import type {FC, SVGProps} from 'react';
import {useId} from 'react';

type TailwindLogoProps = (
  | {height?: never; width?: number}
  | {height?: number; width?: never}
) &
  Omit<SVGProps<SVGSVGElement>, 'height' | 'width'>;

const TailwindLogo: FC<TailwindLogoProps> = ({height, width, ...props}) => {
  const id = useId();
  const adjustedWidth = height ? height * (54 / 33) : (width ?? 54);
  const adjustedHeight = width ? width * (33 / 54) : (height ?? 33);

  return (
    <svg
      fill="none"
      height={adjustedHeight}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 54 33"
      width={adjustedWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${id})`}>
        <path
          clipRule="evenodd"
          d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
          fill="#38bdf8"
          fillRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path d="M0 0h54v32.4H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TailwindLogo;
