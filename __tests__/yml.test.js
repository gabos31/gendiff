import { readFileSync } from 'fs';
import gendiff from '../src';

const path1 = '__tests__/__fixtures__/before.yml';
const path2 = '__tests__/__fixtures__/after.yml';

test('gendiff test', () => expect(gendiff(path1, path2))
  .toBe(readFileSync('__tests__/__fixtures__/tobe1.txt', 'utf8')));
