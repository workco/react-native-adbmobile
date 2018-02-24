// eslint-disable-next-line import/no-extraneous-dependencies
const blacklist = require('metro/src/blacklist');

module.exports = {
  getBlacklistRE() {
    // ignore react-native-adbmobile/node_modules, when
    //    yarn link react-native-adbmobile
    // is used
    return blacklist([/react-native-adbmobile\/node_modules\/.*/]);
  },
};
