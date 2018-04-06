import { readFileSync } from 'fs';
import gendiff from '../src';

test('tree-json test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.json';
  const path2 = '__tests__/__fixtures__/tree-after.json';
  const expectedData = readFileSync('__tests__/__fixtures__/tobe2.txt', 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});
