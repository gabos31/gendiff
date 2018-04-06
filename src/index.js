import fs from 'fs';
import _ from 'lodash';
import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
  '.ini': ini.parse,
};

const toObject = (root, data) =>
  parsers[extname(root)](data);

const stringify = (item, indent1, indent2) => {
  if (!(item instanceof Object)) {
    return item;
  }
  const arr = Object.keys(item).map(key =>
    `${indent2}${[key]}: ${item[key]}`);
  return ['{', ...arr, `${indent1}}`].join('\n');
};

const astItemModel = {
  key: '',
  nextValue: '',
  previousValue: '',
  type: '',
  children: [],
};

const makeAstItem = (key, type, nextValue, previousValue, children) =>
  ({
    ...astItemModel,
    key,
    nextValue,
    previousValue,
    type,
    children,
  });

const astItems = [
  {
    item: (obj1, obj2, key, parser) =>
      makeAstItem(key, 'nested', '', '', [parser(obj1[key], obj2[key])]),
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
  {
    item: (obj1, obj2, key) => makeAstItem(key, 'notChanged', obj2[key], obj1[key]),
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] === obj2[key]),
  },
  {
    item: (obj1, obj2, key) => makeAstItem(key, 'changed', obj2[key], obj1[key]),
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key),
  },
  {
    item: (obj1, obj2, key) => makeAstItem(key, 'added', obj2[key]),
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
  },
  {
    item: (obj1, obj2, key) => makeAstItem(key, 'deleted', '', obj1[key]),
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
  },
];

const getAstItem = (obj1, obj2, key) =>
  _.find(astItems, ({ check }) => check(obj1, obj2, key));

const four = n => '    '.repeat(n);
const two = n => '  '.repeat(n);

const renderItems = {
  nested: (astItem, a, c, b, d, render) =>
    `${four(a)}${astItem.key}: ${astItem.children.map(child =>
      render(child, a + 1, b + 2, c + 1, d + 1))}`,

  notChanged: (astItem, a, c) =>
    `${four(a)}${astItem.key}: ${stringify(astItem.nextValue, four(a), four(c))}`,

  changed: (astItem, a, c, b) =>
    [`${two(b)}+ ${astItem.key}: ${stringify(astItem.nextValue, four(a), four(c))}`,
      `${two(b)}- ${astItem.key}: ${stringify(astItem.previousValue, four(a), four(c))}`],

  added: (astItem, a, c, b) =>
    `${two(b)}+ ${astItem.key}: ${stringify(astItem.nextValue, four(a), four(c))}`,

  deleted: (astItem, a, c, b) =>
    `${two(b)}- ${astItem.key}: ${stringify(astItem.previousValue, four(a), four(c))}`,
};

const gendiff = (path1, path2) => {
  const getData = source => fs.readFileSync(source, 'utf8');
  const obj1 = toObject(path1, getData(path1));
  const obj2 = toObject(path2, getData(path2));
  const parse = (object1, object2) => {
    const unionObjectKeys = _.union(Object.keys(object1), Object.keys(object2));
    return unionObjectKeys.map(key =>
      getAstItem(object1, object2, key).item(object1, object2, key, parse));
  };
  const render = (ast, a = 1, b = 1, c = 2, d = 0) => {
    const resultArr = ast.map(astItem =>
      renderItems[astItem.type](astItem, a, c, b, d, render));
    return _.flatten(['{', ...resultArr, `${four(d)}}`]).join('\n');
  };
  return render(parse(obj1, obj2));
};

export default gendiff;
