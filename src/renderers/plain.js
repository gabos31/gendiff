import _ from 'lodash';

const actions = [
  {
    check: (type, value) => value instanceof Object,
    action: () => 'complex value',
  },
  {
    check: type => type === 'updated',
    action: value => `'${value}'`,
  },
  {
    check: type => type === 'added',
    action: value => `value: '${value}'`,
  },
];

const getAction = (type, value) =>
  _.find(actions, ({ check }) => check(type, value));

const plainRenderItems = {
  nested: (astItem, path, render) =>
    astItem.children.map(child => render(child, [...path, astItem.key])),

  unchanged: () => null,

  updated: (astItem, path) => `Property '${[...path, astItem.key]
    .join('.')}' was updated. From ${getAction(astItem.type, astItem.previousValue)
    .action(astItem.previousValue)} to ${getAction(astItem.type, astItem.nextValue)
    .action(astItem.nextValue)}`,

  added: (astItem, path) => `Property '${[...path, astItem.key]
    .join('.')}' was added with ${getAction(astItem.type, astItem.nextValue)
    .action(astItem.nextValue)}`,

  removed: (astItem, path) =>
    `Property '${[...path, astItem.key].join('.')}' was removed`,
};

const render = (ast, path = []) => {
  const resultArr = ast.map(astItem =>
    plainRenderItems[astItem.type](astItem, path, render));
  return _.compact(resultArr).join('\n');
};

export default render;
