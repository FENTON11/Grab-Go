

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add support for .cjs files (needed for Reanimated)
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

// Apply NativeWind
module.exports = withNativeWind(config, { 
  input: './app/global.css',
  projectRoot: __dirname
});