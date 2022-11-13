var { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('ejs');
config.resolver.extraNodeModules['fs'] = config.resolver.emptyModulePath;
config.resolver.extraNodeModules['path'] = config.resolver.emptyModulePath;

module.exports = config;
