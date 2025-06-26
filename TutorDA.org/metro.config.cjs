const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

// Add .cjs support
if (!defaultConfig.resolver.sourceExts.includes('cjs')) {
  defaultConfig.resolver.sourceExts.push('cjs');
}

// Disable unstable package.exports resolution if needed
defaultConfig.resolver.unstable_enablePackageExports = false;

// Add custom module aliases
defaultConfig.resolver.extraNodeModules = {
  '@': path.resolve(__dirname),
  '@components': path.resolve(__dirname, 'components'),
  '@constants': path.resolve(__dirname, 'constants'),
};

module.exports = defaultConfig;

