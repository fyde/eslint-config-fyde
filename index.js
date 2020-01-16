/**
 * Copyright (c) Fyde, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 */

const prettierConfig = require('./.prettierrc');

// see http://eslint.org/docs/user-guide/configuring.html#configuring-rules
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',

  env: {
    'jest/globals': true,
  },

  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    // Prettier must be last so that it can override other configs.
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],

  plugins: [
    'eslint-comments',
    'flowtype',
    'jest',
    'prettier',
    'react',
    'react-hooks',
  ],

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
    'capitalized-comments': [
      ERROR,
      'always',
      {
        ignoreConsecutiveComments: true,
        ignoreInlineComments: true,
      },
    ],

    // Always use brackets, even when optional.
    curly: [ERROR, 'all'],

    'eslint-comments/disable-enable-pair': ERROR,

    'eslint-comments/no-aggregating-enable': ERROR,

    'eslint-comments/no-duplicate-disable': ERROR,

    'eslint-comments/no-unlimited-disable': ERROR,

    'eslint-comments/no-unused-enable': ERROR,

    // We use this for private/protected identifiers
    'no-underscore-dangle': OFF,

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      ERROR,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],

    /**
     * Prettier
     */
    'prettier/prettier': [ERROR, prettierConfig],

    /**
     * React
     */
    // Disallow `.jsx` because React Native only supports `.js` as extension
    'react/jsx-filename-extension': OFF,

    // Enforce props alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    'react/jsx-sort-props': [
      ERROR,
      {
        ignoreCase: true,
        callbacksLast: false,
        shorthandFirst: false,
        shorthandLast: false,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],

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
          'instance-variables',
          'lifecycle',
          '/^on.+$/',
          'getters',
          'setters',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'instance-methods',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'state',
            'getChildContext',
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],

    /**
     * React Hooks
     */
    'react-hooks/exhaustive-deps': ERROR,
    'react-hooks/rules-of-hooks': ERROR,

    'spaced-comment': [ERROR, 'always'],
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
