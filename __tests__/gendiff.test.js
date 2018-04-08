import { readFileSync } from 'fs';
import gendiff from '../src';

const pathToExpectedTree = '__tests__/__fixtures__/tobe2.txt';

test('text report test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.json';
  const path2 = '__tests__/__fixtures__/tree-after.json';
  const expectedData = readFileSync(pathToExpectedTree, 'utf8');
  expect(gendiff(path1, path2)).toBe(expectedData);
  const path3 = '__tests__/__fixtures__/tree-before.yml';
  const path4 = '__tests__/__fixtures__/tree-after.yml';
  expect(gendiff(path3, path4)).toBe(expectedData);
  const path5 = '__tests__/__fixtures__/tree-before.ini';
  const path6 = '__tests__/__fixtures__/tree-after.ini';
  expect(gendiff(path5, path6)).toBe(expectedData);
});

test('plain report test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.ini';
  const path2 = '__tests__/__fixtures__/tree-after.ini';
  const expectedData = readFileSync('__tests__/__fixtures__/plain.txt', 'utf8');
  expect(gendiff(path1, path2, 'plain')).toBe(expectedData);
});

test('json report test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.ini';
  const path2 = '__tests__/__fixtures__/tree-after.ini';
  const expectedData = JSON.parse(readFileSync('__tests__/__fixtures__/json.json', 'utf8'));
  expect(JSON.parse(gendiff(path1, path2, 'json'))).toEqual(expectedData);
});
