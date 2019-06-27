# eslint-config-fyde

This package provides ESLint and Prettier configurations that are used on Fyde's projects
containing any JavaScript code.

## Usage

### Installation

```
yarn add -D git+ssh://git@github.com:fydeinc/eslint-config-fyde.git
```

Note that all the required dependencies are added by this package.

### Configuration

Extend `fyde` in your local configuration file as shown bellow:

```js
module.exports = {
  extends: ['fyde'],

  rules: {
    // ...
  },
};
```
