import { readFileSync } from 'fs';
import gendiff from '../src';

test('tree-ini test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.ini';
  const path2 = '__tests__/__fixtures__/tree-after.ini';
  const expectedData = readFileSync('__tests__/__fixtures__/tobe2.txt', 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});
