install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js -f plain __tests__/__fixtures__/tree-before.ini __tests__/__fixtures__/tree-after.ini
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm test


