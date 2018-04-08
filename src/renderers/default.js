import _ from 'lodash';

const stringify = (value, n) => {
  if (!_.isObject(value)) {
    return value;
  }
  const arr = Object.keys(value).map(key =>
    `${' '.repeat(n + 4)}${[key]}: ${value[key]}`);
  return ['{', ...arr, `${' '.repeat(n)}}`].join('\n');
};

const renderItems = {
  nested: (astItem, n, render) =>
    `${' '.repeat(n)}${astItem.key}: ${render(astItem.value, n + 4)}`,

  unchanged: (astItem, n) =>
    `${' '.repeat(n)}${astItem.key}: ${stringify(astItem.value, n)}`,

  updated: (astItem, n) =>
    [`${' '.repeat(n - 2)}+ ${astItem.key}: ${stringify(astItem.value, n)}`,
      `${' '.repeat(n - 2)}- ${astItem.key}: ${stringify(astItem.oldValue, n)}`],

  added: (astItem, n) =>
    `${' '.repeat(n - 2)}+ ${astItem.key}: ${stringify(astItem.value, n)}`,

  removed: (astItem, n) =>
    `${' '.repeat(n - 2)}- ${astItem.key}: ${stringify(astItem.value, n)}`,
};

const render = (ast, n = 4) => {
  const resultArr = ast.map(astItem =>
    renderItems[astItem.type](astItem, n, render));
  return _.flatten(['{', ...resultArr, `${' '.repeat(n - 4)}}`]).join('\n');
};

export default render;
