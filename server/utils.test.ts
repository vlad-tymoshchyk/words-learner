import { readYaml, writeYaml } from './utils';
import { writeFileSync, readFileSync } from 'fs';

jest.mock('fs');

const readFileSyncMock = readFileSync as jest.MockedFunction<
  typeof readFileSync
>;

describe('utils', () => {
  it('writeYaml', () => {
    expect(
      writeYaml('test-filename', {
        one: {
          word: 'one',
        },
      })
    ).toBe(undefined);
    expect(writeFileSync).toHaveBeenCalledWith(
      'storage/test-filename',
      'one:\n  word: one\n'
    );
  });

  it('readYaml', () => {
    const testFilename = 'test-filename';
    readFileSyncMock.mockReturnValue(
      'main:\n  examples:\n    - one\n    - two\n'
    );
    expect(readYaml(testFilename)).toStrictEqual({
      main: { examples: ['one', 'two'] },
    });
    expect(readFileSyncMock).toHaveBeenCalledWith(`storage/${testFilename}`);
  });
});
