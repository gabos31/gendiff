# Difference Generator

[![Build Status](https://travis-ci.org/gabos31/gendiff.svg?branch=master)](https://travis-ci.org/gabos31/gendiff)
[![Maintainability](https://api.codeclimate.com/v1/badges/354923419afb286ac793/maintainability)](https://codeclimate.com/github/gabos31/gendiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/354923419afb286ac793/test_coverage)](https://codeclimate.com/github/gabos31/gendiff/test_coverage)

***
## Description

Compares two configuration files and shows the difference.
Supported formats: ```json, yaml, ini```.

***
## Installation

```$ npm install cli-g31```

## Usage

    $ gendiff --help

      Usage: gendiff [options] <firstConfig> <secondConfig>

      Compares two configuration files and shows the difference.

      Options:

        -V, --version        output the version number
        -f, --format [type]  output format (default: "text")
        -h, --help           output usage information

## Example

    before.json

    {
      "key1": "was not changed",
      "key2": "to be removed",
      "key3": "was not changed",
      "nested": {
        "innerKey1": "to be removed"
      }
    }

<!-- -->

    after.json

    {
      "key1": "was changed",
      "key3": "was not changed",
      "key4": "was added",
      "nested": {
        "innerKey2": "was added"
      }
    }

<!-- -->

    $ gendiff before.json after.json

    {
      + key1: was changed
      - key1: was not changed
      - key2: to be removed
        key3: was not changed
        nested: {
          - innerKey1: to be removed
          + innerKey2: was added
        }
      + key4: was added
    }

<!-- -->

    $ gendiff -f plain before.json after.json

    Property 'key1' was updated. From 'was not changed' to 'was changed'
    Property 'key2' was removed
    Property 'nested.innerKey1' was removed
    Property 'nested.innerKey2' was added with value: 'was added'
    Property 'key4' was added with value: 'was added'

<!-- -->

    $ gendiff -f json before.json after.json

    [{"key":"key1","type":"changed","valueBefore":"was not changed","valueAfter":"was changed"},{"key":"key2","type":"removed","value":"to be removed"},{"key":"key3","type":"common","value":"was not changed"},{"key":"nested","type":"nested","children":[{"key":"innerKey1","type":"removed","value":"to be removed"},{"key":"innerKey2","type":"added","value":"was added"}]},{"key":"key4","type":"added","value":"was added"}]
