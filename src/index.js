const { Command } = require('commander');
const configCommand = require('./npm-tool-config/index.js');
const program = new Command();

program
  .version(require('../package.json').version)
// .option('-set,--key <key...>', 'set key value')

// 添加command命令
program.addCommand(configCommand());
program.parse(process.argv);