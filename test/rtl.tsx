import {cleanup} from '@testing-library/react';
import {afterEach} from 'vitest';

afterEach(() => {
  cleanup();
});

// re-export testing library
export * from '@testing-library/react';
