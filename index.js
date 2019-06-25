/**
 * Copyright (c) 2018 Fyde, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 */

const prettierConfig = require('./prettierrc');

// see http://eslint.org/docs/user-guide/configuring.html#configuring-rules
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  env: {
    jest: true,
    jasmine: true,
  },

  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    // Prettier must be last so that it can override other configs.
    'prettier',
    'prettier/flowtype',
  ],

  plugins: ['flowtype', 'jest', 'prettier', 'react'],

  // Values of true mean the global may be modified. Values of false represent
  // constants.
  globals: {
    __DEV__: true,
    window: false,
    // https://developer.mozilla.org/en/docs/Web/API/Fetch_API
    fetch: false,
    TimeoutID: false,
  },

  rules: {
    // Always use brackets, even when optional.
    curly: [ERROR, 'all'],
    // We use this for private/protected identifiers
    'no-underscore-dangle': OFF,

    /**
     * React
     */
    // Disallow `.jsx` because React Native only supports `.js` as extension
    'react/jsx-filename-extension': OFF,

    // Ignore `defaultProps` for required prop types
    'react/default-props-match-prop-types': [
      ERROR,
      { allowRequiredDefaults: true },
    ],

    // Disable use of prop-types since we are using Flow for type checking
    'react/prop-types': OFF,

    // Enforce component methods order
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    'react/sort-comp': [
      ERROR,
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      },
    ],

    'prettier/prettier': [ERROR, prettierConfig],
  },

  settings: {
    'import/resolver': {
      // Allow '.ios.js' and '.android.js' extensions in order to avoid
      // specifying the file extensions when importing platform-specific code.
      // https://facebook.github.io/react-native/docs/platform-specific-code.html
      node: {
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    },
  },
};
