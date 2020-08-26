/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * For more info regarding metro config:
 * @see https://facebook.github.io/metro/docs/configuration
 * @see https://raw.githubusercontent.com/facebook/metro/ba01db616f3371a9832825afa42506643b7b173f/packages/metro-config/src/defaults/defaults.js
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');
const pak = require('../package.json');
const examplePak = require('./package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

const dependencies = Object.keys({
  ...examplePak.dependencies,
});

const blacklistRE = blacklist([
  ...modules.map(m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)),
  ...dependencies.map(d => new RegExp(`^${escape(path.join(root, 'node_modules', d))}\\/.*$`)),
]);

module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we blacklist them at the root, and alias them to the versions in example's node_modules
  // same goes for dependencies
  resolver: {
    blacklistRE,

    extraNodeModules: {
      ...modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
      ...dependencies.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
    },
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
