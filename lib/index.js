const{Command:e}=require("commander"),r=require("./npm-tool-config/index.js"),n=new e;n.version(require("../package.json").version),n.addCommand(r()),n.parse(process.argv);
