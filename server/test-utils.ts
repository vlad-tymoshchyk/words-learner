export const returnAsMock = <T extends (...args: any[]) => any>(
  foo: T
): jest.MockedFunction<T> => {
  return foo as jest.MockedFunction<T>;
};
