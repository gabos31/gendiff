import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
};

const toObject = (root, data) => {
  const ext = path.extname(root);
  const parse = parsers[ext];
  return parse(data);
};

const gendiff = (path1, path2) => {
  const getData = source => fs.readFileSync(source, 'utf8');
  const obj1 = toObject(path1, getData(path1));
  const obj2 = toObject(path2, getData(path2));
  const unionObjKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const result = unionObjKeys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [`\n    ${key}: ${obj1[key]}`];
      }
      return [`\n  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`];
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return [`\n  + ${key}: ${obj2[key]}`];
    }
    return [`\n  - ${key}: ${obj1[key]}`];
  }, []);
  return ['{', ...result, '\n}'].join('');
};

export default gendiff;
