// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// config.resolver.extraNodeModules = {
//   "@": __dirname + "/app",
//   "@components": __dirname + "/app/components",
//   "@utils": __dirname + "/app/utils",
// };

module.exports = config;

