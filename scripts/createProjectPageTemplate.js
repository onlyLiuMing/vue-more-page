/**
 * @description 项目结构快速生成 “项目页面template” 脚本，位于项目views文件夹下
 * @example node ./createProjectTemplate --project=<% project_name %>  --page=<% page_name %>
 */

const fs = require("fs");
const path = require("path");
const Colors = require("colors");
const args = require("yargs").argv;

const ARGS_PROJECT_KEY = "project";
const ARGS_PAGE_KEY = "page";

const PROJECT_NAME = args[ARGS_PROJECT_KEY] || "";
const PAGE_NAME = args[ARGS_PAGE_KEY] || "";
const PROJECT_DIST_PATH = path.resolve(
  __dirname,
  "..",
  "src/projects",
  PROJECT_NAME
);
const PAGE_DIST_PATH = path.join(PROJECT_DIST_PATH,'views',PAGE_NAME);

if (!PROJECT_NAME) {
  console.info(
    Colors.magenta("项目名称不能为空，--project=<% project_name %>")
  );
  process.exit(1);
}else if(!PAGE_NAME){
  console.info(
    Colors.magenta("页面名称不能为空，--page=<% page_name %>")
  );
  process.exit(1);
}else if (!fs.existsSync(PROJECT_DIST_PATH)){
  // 不存在此项目
  console.info(Colors.magenta("此项目不存在"));
  process.exit(1);
} else if (fs.existsSync(PAGE_DIST_PATH)) {
  // 页面已存在
  console.info(Colors.magenta("页面已存在"));
  process.exit(1); 
}

const CLASSS_PREFIX = 'fx';// class scope 前缀
const PAGE_TEMPLATE = `<template>
<div class="${CLASSS_PREFIX}-${PROJECT_NAME}">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class ${PROJECT_NAME} extends Vue {
  name = '${PROJECT_NAME}';
  data() {
    return { };
  }
  beforeCreate() {}
  created() {}
  beforeMount() {}
  mounted(){}
  beforeUpdate() {}
  updated() {}
  activated() {}
  deactivated() {}
  beforeDestroy() {}
  destroyed() { }
  errorCaptured(err:Error, vm:any, info:string):boolean {
    return false 
  }
  props = {};
  methods = {};
  computed = {};
  watch = {}
}
</script>
<style lang="scss" scope>
  @import "~@/assets/scss/app.scss"
  .${CLASSS_PREFIX}-${PROJECT_NAME}{ }
</style>`;

// create file
fs.mkdirSync(`${PAGE_DIST_PATH}`);
process.chdir(`${PAGE_DIST_PATH}`);
fs.mkdirSync(`${PAGE_DIST_PATH}/components`);
fs.mkdirSync(`${PAGE_DIST_PATH}/images`);
fs.writeFileSync(`${PROJECT_NAME}.vue`,PAGE_TEMPLATE);