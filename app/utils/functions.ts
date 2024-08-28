export const tryCatch = async <T, A extends readonly unknown[]>(
  fn: (...args: A) => T,
  ...args: A
): Promise<[result?: Awaited<T>, error?: Error]> => {
  let error;
  let result;

  try {
    // eslint-disable-next-line sonarjs/no-invalid-await
    result = await fn(...args);
  } catch (caughtError) {
    error = caughtError as Error;
  }

  return [result, error];
};

export const noop = () => {};

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
