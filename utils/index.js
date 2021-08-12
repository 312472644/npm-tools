const fs = require('fs');
const glob = require('glob');
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
  },
  /**
   * 获取目录下所有文件名称
   *
   * @param {*} dirName
   */
  getDirectoryFile(dirName) {
    const absolutePath = path.join(process.cwd(), dirName);
    const entryList = glob.sync(path.join(`${absolutePath}/**/*`), { nodir: true });
    const entry = {};
    entryList.map((item) => {
      let pageName = null;
      const pathList = item.split('/');
      const dirIndex = item.indexOf(dirName) + dirName.length + 1;
      const dirPath = item.slice(dirIndex);
      // 目标路径是否有其他文件夹
      if (dirPath.indexOf('/') > -1) {
        pageName = dirPath.replace('.js', '');
      } else {
        pageName = pathList[pathList.length - 1].replace('.js', '');
      }
      entry[pageName] = item;
    });
    return entry;
  }
};

module.exports = utils;