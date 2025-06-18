const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

// Add .cjs support
if (!defaultConfig.resolver.sourceExts.includes('cjs')) {
  defaultConfig.resolver.sourceExts.push('cjs');
}

// Disable unstable package.exports resolution if needed
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
