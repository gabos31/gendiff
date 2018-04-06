import { readFileSync } from 'fs';
import gendiff from '../src';

test('tree-yaml test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.yml';
  const path2 = '__tests__/__fixtures__/tree-after.yml';
  const expectedData = readFileSync('__tests__/__fixtures__/tobe2.txt', 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});
