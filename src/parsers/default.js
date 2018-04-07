import _ from 'lodash';

const astItemModel = {
  key: '',
  nextValue: '',
  previousValue: '',
  type: '',
  children: [],
};

const astItems = [
  {
    item: (obj1, obj2, key, parser) =>
      ({
        ...astItemModel,
        key,
        type: 'nested',
        children: [parser(obj1[key], obj2[key])],
      }),
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
        (obj1[key] instanceof Object && obj2[key] instanceof Object),
  },
  {
    item: (obj1, obj2, key) =>
      ({
        ...astItemModel,
        key,
        type: 'unchanged',
        nextValue: obj1[key],
      }),
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
        (obj1[key] === obj2[key]),
  },
  {
    item: (obj1, obj2, key) =>
      ({
        ...astItemModel,
        key,
        type: 'updated',
        nextValue: obj2[key],
        previousValue: obj1[key],
      }),
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key),
  },
  {
    item: (obj1, obj2, key) =>
      ({
        ...astItemModel,
        key,
        type: 'added',
        nextValue: obj2[key],
      }),
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
  },
  {
    item: (obj1, obj2, key) =>
      ({
        ...astItemModel,
        key,
        type: 'removed',
        previousValue: obj1[key],
      }),
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
  },
];

const buildAst = (obj1, obj2, keys, parser) => keys.map(key =>
  _.find(astItems, ({ check }) => check(obj1, obj2, key))
    .item(obj1, obj2, key, parser));

const parse = (object1, object2) => {
  const unionObjectKeys = _.union(Object.keys(object1), Object.keys(object2));
  return buildAst(object1, object2, unionObjectKeys, parse);
};

export default parse;
