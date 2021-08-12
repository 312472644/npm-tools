import { terser } from "rollup-plugin-terser";
const utils = require('./utils/index.js');

module.exports = {
  input: utils.getDirectoryFile('src'),
  output: {
    dir: './lib',
    entryFileNames: '[name].js'
  },
  plugins: [
    terser({ compress: true })
  ]
};