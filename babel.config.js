module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@components': './components',
            '@constants': './constants',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
