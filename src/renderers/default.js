import _ from 'lodash';

const stringify = (item, indent1, indent2) => {
  if (!(item instanceof Object)) {
    return item;
  }
  const arr = Object.keys(item).map(key =>
    `${indent2}${[key]}: ${item[key]}`);
  return ['{', ...arr, `${indent1}}`].join('\n');
};

const four = n => '    '.repeat(n);
const two = n => '  '.repeat(n);

const defaultRenderItems = {
  nested: (astItem, a, c, b, d, render) =>
    `${four(a)}${astItem.key}: ${astItem.children.map(child =>
      render(child, a + 1, b + 2, c + 1, d + 1))}`,

  unchanged: (astItem, a, c) =>
    `${four(a)}${astItem.key}: ${stringify(astItem.nextValue, four(a), four(c))}`,

  updated: (astItem, a, c, b) =>
    [`${two(b)}+ ${astItem.key}: ${stringify(astItem.nextValue, four(a), four(c))}`,
      `${two(b)}- ${astItem.key}: ${stringify(astItem.previousValue, four(a), four(c))}`],

  added: (astItem, a, c, b) =>
    `${two(b)}+ ${astItem.key}: ${stringify(astItem.nextValue, four(a), four(c))}`,

  removed: (astItem, a, c, b) =>
    `${two(b)}- ${astItem.key}: ${stringify(astItem.previousValue, four(a), four(c))}`,
};

const render = (ast, a = 1, b = 1, c = 2, d = 0) => {
  const resultArr = ast.map(astItem =>
    defaultRenderItems[astItem.type](astItem, a, c, b, d, render));
  return _.flatten(['{', ...resultArr, `${four(d)}}`]).join('\n');
};

export default render;
