import type {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import {createContext, useContext, useState} from 'react';
import type {Maybe} from '~/types';
import {noop} from '~/utils/function';

// Based on Kent C Dodds' blog post:
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

type ExampleContextValue = [
  Maybe<string>,
  Dispatch<SetStateAction<Maybe<string>>>,
];

const ExampleContext = createContext<ExampleContextValue>([undefined, noop]);

export const useExample = () => {
  const context = useContext(ExampleContext) as Maybe<ExampleContextValue>;

  if (!context) {
    throw new Error('useExample must be used within an ExampleProvider');
  }

  return context;
};

type ExampleProviderProps = {
  children: ReactNode;
  initialState?: Maybe<string>;
};

export const ExampleProvider: FC<ExampleProviderProps> = ({
  children,
  initialState,
}) => {
  // eslint-disable-next-line sonarjs/hook-use-state
  const value = useState<Maybe<string>>(initialState);

  return (
    <ExampleContext.Provider value={value}>{children}</ExampleContext.Provider>
  );
};

ExampleProvider.displayName = 'ExampleProvider';
