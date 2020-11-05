module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  rules: {
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'operator-linebreak': ['error', 'after'],
    'react/no-array-index-key': 1,
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'no-param-reassign': 0
  },
  env: {
    browser: true,
    node: true
  }
};
