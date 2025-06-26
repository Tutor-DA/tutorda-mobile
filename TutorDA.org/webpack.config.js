import createExpoWebpackConfigAsync from '@expo/webpack-config';

export default async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // ✅ Add support for TSX, TS, web-specific, etc.
  config.resolve = {
    ...config.resolve,
    extensions: [
      '.web.js',
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json'
    ]
  };

  return config;
};
