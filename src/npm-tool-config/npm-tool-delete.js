const ora = require('ora');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const utils = require('../../utils/index.js');

// proxy列表
const proxyList = utils.readJSONFile('../config/registry.json', 'registry');

const proxyQuestion = [{
  name: 'proxy',
  type: 'list',
  message: 'delete a npm proxy',
  choices: proxyList
}];

inquirer
  .prompt(proxyQuestion)
  .then((answer) => {
    const { proxy } = answer;
    const index = proxyList.findIndex(item => item === proxy.trim());
    const spinner = ora();
    try {
      const registryJSONPath = path.join(process.cwd(), './config/registry.json');
      const registryJSON = JSON.parse(fs.readFileSync(registryJSONPath, 'utf-8'));
      if (registryJSON.registry.length === 1) {
        spinner.warn('the last registry is not must deleted');
        return;
      }
      registryJSON.registry.splice(index, 1);
      fs.writeFileSync(registryJSONPath, JSON.stringify(registryJSON, null, '\t'), 'utf8');
      spinner.succeed('delete registry success');
    } catch (error) {
      spinner.fail(`delete registry failed`);
    }
  })