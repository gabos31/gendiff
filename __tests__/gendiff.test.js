import { readFileSync } from 'fs';
import gendiff from '../src';

const pathToExpected = '__tests__/__fixtures__/tobe1.txt';
const pathToExpectedTree = '__tests__/__fixtures__/tobe2.txt';

test('*.json test', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const expectedData = readFileSync(pathToExpected, 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});

test('*.yaml test', () => {
  const path1 = '__tests__/__fixtures__/before.yml';
  const path2 = '__tests__/__fixtures__/after.yml';
  const expectedData = readFileSync(pathToExpected, 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});

test('*.ini test', () => {
  const path1 = '__tests__/__fixtures__/before.ini';
  const path2 = '__tests__/__fixtures__/after.ini';
  const expectedData = readFileSync(pathToExpected, 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});

test('tree-json test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.json';
  const path2 = '__tests__/__fixtures__/tree-after.json';
  const expectedData = readFileSync(pathToExpectedTree, 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});

test('tree-yaml test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.yml';
  const path2 = '__tests__/__fixtures__/tree-after.yml';
  const expectedData = readFileSync(pathToExpectedTree, 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});

test('tree-ini test', () => {
  const path1 = '__tests__/__fixtures__/tree-before.ini';
  const path2 = '__tests__/__fixtures__/tree-after.ini';
  const expectedData = readFileSync(pathToExpectedTree, 'utf8');
  return expect(gendiff(path1, path2)).toBe(expectedData);
});
