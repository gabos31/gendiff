import _ from 'lodash';

const typeActions = {
  updated: value => (_.isObject(value) ? 'complex value' : `'${value}'`),
  added: value => (_.isObject(value) ? 'complex value' : `value: '${value}'`),
};

const renderItems = {
  nested: (astItem, path, render) =>
    render(astItem.children, [...path, astItem.key]),

  updated: (astItem, path) => `Property '${[...path, astItem.key]
    .join('.')}' was updated. From ${typeActions[astItem
    .type](astItem.oldValue)} to ${typeActions[astItem.type](astItem.newValue)}`,

  added: (astItem, path) => `Property '${[...path, astItem.key]
    .join('.')}' was added with ${typeActions[astItem.type](astItem.value)}`,

  removed: (astItem, path) =>
    `Property '${[...path, astItem.key].join('.')}' was removed`,
};

const render = (ast, path = []) => {
  const resultArr = ast.filter(({ type }) => type !== 'unchanged')
    .map(astItem => renderItems[astItem.type](astItem, path, render));
  return resultArr.join('\n');
};

export default render;
