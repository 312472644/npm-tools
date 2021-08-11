const fs = require('fs');
const path = require('path');

const utils = {
  /**
   * 读取JSON文件内容
   *
   * @param {*} path 路径
   * @param {*} propName 属性名称
   */
  readJSONFile(path, propName) {
    const json = require(path);
    return json[propName];
  }
};

module.exports = utils;