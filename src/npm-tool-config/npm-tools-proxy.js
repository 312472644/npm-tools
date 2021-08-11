/** 选择npm代理 */
const inquirer = require('inquirer');
const colors = require('colors');
const { exec, execSync } = require('child_process');
const utils = require('../../utils/index.js');
const ora = require('ora');

// proxy列表
const proxyList = utils.readJSONFile('../config/registry.json', 'registry');
//默认代理配置
const defaultProxy = execSync('npm config get registry', (error) => {
  console.log(`${error}`.red);
}).toString().trim();

const proxyQuestion = [{
  name: 'proxy',
  type: 'list',
  message: 'select a npm proxy',
  choices: proxyList,
  default: defaultProxy
}];

inquirer
  .prompt(proxyQuestion)
  .then((answer) => {
    const { proxy } = answer;
    const command = `npm config set registry=${proxy}`;
    exec(command, (error) => {
      const spinner = ora();
      if (error) {
        spinner.fail('set registry failed'.red);
        return;
      }
      spinner.succeed('set registry success'.green);
    })
  })
