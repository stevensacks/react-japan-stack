// eslint-disable-next-line canonical/filename-match-exported
import type {FC, ReactNode} from 'react';
import type {Theme} from '~/state/theme';
import {ThemeProvider} from '~/state/theme';
import {ThingProvider} from '~/state/thing';
import type {Maybe, Thing} from '~/types';

type StateProps = {
  theme?: Theme;
  thing?: Maybe<Thing>;
};

const State: FC<{children: ReactNode} & StateProps> = ({
  children,
  theme,
  thing,
}) => (
  <ThemeProvider initialState={theme}>
    <ThingProvider initialState={thing}>{children}</ThingProvider>
  </ThemeProvider>
);

export default State;
