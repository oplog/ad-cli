// aliases
const convertPathsToAliases = require("convert-tsconfig-paths-to-webpack-aliases")
    .default;

// all comments in tsconfig.json must be removed
const tsconfig = require("./../tsconfig.json");

const aliases = convertPathsToAliases(tsconfig);

module.exports = aliases;
