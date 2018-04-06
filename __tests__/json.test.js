import { readFileSync } from 'fs';
import gendiff from '../src';

test('*.json test', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const expectedData = readFileSync('__tests__/__fixtures__/tobe1.txt', 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});
