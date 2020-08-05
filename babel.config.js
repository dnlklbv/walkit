module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@data': './src/data',
          '@views': './src/views',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
