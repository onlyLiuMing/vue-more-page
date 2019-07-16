const path = require('path');
const fs = require('fs');
// const args = require("node-args");
const args = require('yargs').argv;
const Colors = require('colors');

// args上传入的project_name的key   --project=${project_name}
const ARG_PROJECT_NAME_KEY = 'project';
// project name
const PROJECT_NAME = args[ARG_PROJECT_NAME_KEY];
// TODO: 使用vue inspect命令时，需要在这里手动指定目标文件（它的传值检测有问题！）
// const PROJECT_NAME = "template";
// project path
const PROJECT_PATH = path.resolve(
  __dirname,
  `./src/projects/${PROJECT_NAME}/main.ts`
);
// dist path
const DIST_PATH = path.resolve(__dirname, `./dist/${PROJECT_NAME}`);
// webpackage.entry
const WEBPACK_ENTRY_CONFIG = {
  [PROJECT_NAME]: {
    entry: PROJECT_PATH,
  },
};
// webpackage.output
const WEBPACK_OUTPUT_DIR = DIST_PATH;

if (!PROJECT_NAME) {
  console.error(Colors.magenta('未指定项目名称 --project=#{project_name}'));
  process.exit(0);
}
if (!fs.existsSync(PROJECT_PATH)) {
  console.error(
    Colors.magenta('项目未找到，请确认项目名称  --project=#{project_name}')
  );
  process.exit(0);
}

module.exports = {
  pages: WEBPACK_ENTRY_CONFIG,
  outputDir: WEBPACK_OUTPUT_DIR,
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin(`html-${PROJECT_NAME}`).tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0].template = path.resolve(
        __dirname,
        `src/projects/${PROJECT_NAME}/index.html`
      );
      args[0].filename = 'index.html';
      return args;
    });
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
};
