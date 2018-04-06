import { readFileSync } from 'fs';
import gendiff from '../src';

test('*.ini test', () => {
  const path1 = '__tests__/__fixtures__/before.ini';
  const path2 = '__tests__/__fixtures__/after.ini';
  const expectedData = readFileSync('__tests__/__fixtures__/tobe1.txt', 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});
