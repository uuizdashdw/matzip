// module.exports = {
//   root: true,
//   extends: '@react-native',
// };
export default {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-native/all', // React Native 관련 규칙 추가
  ],
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: true,
        tabWidth: 2, // typo 수정 (tabWitdth -> tabWidth)
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    'react/react-in-jsx-scope': 'off', // React 17 이후 JSX 사용 시 필요 없음
    'react-native/no-inline-styles': 'warn', // 인라인 스타일 사용 경고
    // 추가 규칙을 여기에 추가할 수 있습니다.
  },
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
  },
};
