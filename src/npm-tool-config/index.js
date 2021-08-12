/** config命令以及其子命令  */
const commander = require('commander');
const addRegistry = require('./npm-tool-add.js');
const { Command } = commander;

const init = () => {
  const configCommand = new Command('config');
  const addConfigCommand = new Command('add');
  // 选择npm代理
  // executableFile 系统默认会从bin路径下寻找，指定定义命令文件即可
  configCommand
    .command('proxy', 'select a registry', { executableFile: 'sugar-npm-tools-config-proxy' })
    .command('delete', 'delete a registry', { executableFile: 'sugar-npm-tools-config-delete' });

  //新增npm代理
  addConfigCommand
    .description('add a registry')
    .arguments('<registry>')
    .action((registry) => {
      addRegistry(registry);
    });

  configCommand.addCommand(addConfigCommand);
  return configCommand;
}

module.exports = init;