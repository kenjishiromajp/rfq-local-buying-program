/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",

    // Prettier plugin and recommended rules
    'prettier',
    'plugin:prettier/recommended',
    
  ],

  plugins: ['@typescript-eslint', 'import', 'css-modules', 'prettier', 'react-hooks', 'eslint-plugin-import-helpers', 'cypress'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {jsx: true}, // Allows for the parsing of JSX
  },

  globals: {
    __DEV__: true,
  },

  env: {
    browser: true,
    jest: true,
    'cypress/globals': true,
  },

  ignorePatterns: [
    'webpack*.js',
    'node_modules/',
    '**/cypress/**/*.js',
  ],

  rules: {
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', {packageDir: '.'}],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-useless-constructor': 'off',
    // Ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': ['Link'],
      'specialLink': ['hrefLeft', 'hrefRight'],
      'aspects': ['invalidHref', 'preferButton']
    }],
    "import/no-unresolved": "off",
    // Resolve path to module
    'react/no-unescaped-entities': 'off',
    'react/static-property-placement': 'off',

    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [
      'error',
      {extensions: ['.js', '.jsx', '.tsx']},
    ],

    // Functional and class components are equivalent from React’s point of view
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',
    // Include .prettierrc.js rules
    'prettier/prettier': ['error', {}, {usePrettierrc: true}],
    'react/prop-types': 'off', // We turn off prop-types rule, as we will use TypeScript's types instead.

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',

    'react/jsx-props-no-spreading': 'off',

    'react/forbid-prop-types': 'off',
    'react/destructuring-assignment': 'off',

    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'camelcase': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // Stack 9 eslint
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        // example configuration
        newlinesBetween: 'always',
        groups: [
          ['/^react/', '/^next/'],
          'module',
          ['/^contexts/', '/^components/', '/^models/', '/^services/', '/^middleware/'],
          ['parent', 'sibling', 'index'],
          '/.scss$|.css$/',
        ],
        alphabetize: {order: 'asc', ignoreCase: true},
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};

