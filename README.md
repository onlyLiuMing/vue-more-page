# vue-ssr

> vue-cli@3.x创建的 vue@2.6 + typescript 多项目入口的项目,

```
已知问题：
  1. vue inspect > output.js 导出webpack.config，由于此命令不能传入额外参数，需要手动修改vue.config.js中的项目名称，再进行导出操作
  2. “快速生成脚本”写的比较粗劣，凑合着用吧
```

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve --project=<% project_name %>
```

### Compiles and minifies for production
```
yarn run build --project=<% project_name %>
```
### 快速创建项目
```
yarn create_project --project=<% project_name %>
```
### 快速创建项目page
```
yarn create_project --project=<% project_name %> --page=<% page_name %>
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
