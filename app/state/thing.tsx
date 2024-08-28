import type {FC, ReactNode} from 'react';
import {createContext, useContext} from 'react';
import type {Maybe, Thing} from '~/types';

const ThingContext = createContext<Maybe<Thing>>(null);

export const useThing = (): Thing => useContext(ThingContext) as Thing;

type ThingProviderProps = {
  children: ReactNode;
  initialState?: Maybe<Thing>;
};

export const ThingProvider: FC<ThingProviderProps> = ({
  children,
  initialState,
}) => (
  <ThingContext.Provider value={initialState}>{children}</ThingContext.Provider>
);

ThingProvider.displayName = 'ThingProvider';
