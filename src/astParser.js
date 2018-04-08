import _ from 'lodash';

const astItems = [
  {
    item: (key, obj1, obj2, parser) =>
      ({ key, type: 'nested', value: parser(obj1[key], obj2[key]) }),
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
        (_.isObject(obj1[key]) && _.isObject(obj2[key])),
  },
  {
    item: (key, obj1) => ({ key, type: 'unchanged', value: obj1[key] }),
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
        (obj1[key] === obj2[key]),
  },
  {
    item: (key, obj1, obj2) => ({
      key, type: 'updated', value: obj2[key], oldValue: obj1[key],
    }),
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key),
  },
  {
    item: (key, obj1, obj2) => ({ key, type: 'added', value: obj2[key] }),
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
  },
  {
    item: (key, obj1) => ({ key, type: 'removed', value: obj1[key] }),
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
  },
];

const getAstItem = (obj1, obj2, key) =>
  _.find(astItems, ({ check }) => check(obj1, obj2, key));

const parse = (object1, object2) => {
  const unionObjectKeys = _.union(Object.keys(object1), Object.keys(object2));
  return unionObjectKeys.map((key) => {
    const { item } = getAstItem(object1, object2, key);
    return item(key, object1, object2, parse);
  });
};

export default parse;
