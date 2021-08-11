const colors = require('colors');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

/**
 * 新增npm代理选项
 *
 * @param {*} registry 代理地址
 */
const addRegistry = (registry) => {
  const spinner = ora();
  try {
    const registryJSONPath = path.join(process.cwd(), './config/registry.json');
    const registryJSON = JSON.parse(fs.readFileSync(registryJSONPath, 'utf-8'));
    const registryList = registryJSON.registry || [];
    if (!registryList.includes(registry)) {
      registryList.push(registry);
      registryJSON.registry = registryList;
      
      fs.writeFileSync(registryJSONPath, JSON.stringify(registryJSON, null, '\t'), 'utf8');
      spinner.succeed('add success');
    } else {
      spinner.warn('the registry is existed'.yellow);
    }
  } catch (error) {
    spinner.fail('add failed'.red);
  }
};

module.exports = addRegistry;