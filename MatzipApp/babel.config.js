module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ], // 이 줄이 필요합니다
};
