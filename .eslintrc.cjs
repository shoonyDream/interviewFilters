module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue-pug/vue3-recommended',
    // '@nuxtjs/eslint-config-typescript',
    // 'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: false,
    },
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'vue/no-v-html': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'no-control-regex': 'off',
    'vue/no-reserved-component-names': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'import/named': 'off',
    'no-useless-escape': 'off',
    'import/no-named-default': 'off',
    'vue/no-textarea-mustache': 'off',
    'no-use-before-define': 'off',
    camelcase: 'off',
  },
};
