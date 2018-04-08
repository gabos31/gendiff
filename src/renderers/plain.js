import _ from 'lodash';

const typeActions = {
  updated: value => (_.isObject(value) ? 'complex value' : `'${value}'`),
  added: value => (_.isObject(value) ? 'complex value' : `value: '${value}'`),
};

const renderItems = {
  nested: (astItem, path, render) =>
    render(astItem.value, [...path, astItem.key]),

  unchanged: () => null,

  updated: (astItem, path) => `Property '${[...path, astItem.key]
    .join('.')}' was updated. From ${typeActions[astItem
    .type](astItem.oldValue)} to ${typeActions[astItem.type](astItem.value)}`,

  added: (astItem, path) => `Property '${[...path, astItem.key]
    .join('.')}' was added with ${typeActions[astItem.type](astItem.value)}`,

  removed: (astItem, path) =>
    `Property '${[...path, astItem.key].join('.')}' was removed`,
};

const render = (ast, path = []) => {
  const resultArr = ast.map(astItem =>
    renderItems[astItem.type](astItem, path, render));
  return _.compact(resultArr).join('\n');
};

export default render;
