import commander from 'commander';
import fs from 'fs';
import _ from 'lodash';
// import yaml from 'js-yaml';

const gendiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const result1 = Object.keys(obj2).reduce((acc, key) => {
    if (_.has(obj1, key)) {
      if (obj2[key] === obj1[key]) {
        return [`\n    ${key}: ${obj1[key]}`, ...acc];
      }
      return [`\n  + ${key}: ${obj2[key]}`, `\n  - ${key}: ${obj1[key]}`, ...acc];
    }
    return [...acc, `\n  + ${key}: ${obj2[key]}`];
  }, []);
  const result2 = Object.keys(obj1).reduce((acc, key) => {
    if (!_.has(obj2, key)) {
      return [...acc, `\n  - ${key}: ${obj1[key]}`];
    }
    return acc;
  }, result1);
  return ['{', ...result2, '\n}'].join('');
};

export const comm = commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) =>
    console.log(gendiff(firstConfig, secondConfig)));

export default gendiff;
