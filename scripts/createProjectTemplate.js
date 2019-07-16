/**
 * @description 项目结构快速生成脚本
 * @example node ./createProjectTemplate --project=<% project_name %>
 */

const fs = require("fs");
const path = require("path");
const Colors = require("colors");
const args = require("yargs").argv;

const ARGS_KEY = "project";

const PROJECT_NAME = args[ARGS_KEY] || "";
const PROJECT_DIST_PATH = path.resolve(
  __dirname,
  "..",
  "src/projects",
  PROJECT_NAME
);

if (!PROJECT_NAME) {
  console.info(
    Colors.magenta("项目名称不能为空，--project=<% project_name %>")
  );
  process.exit(1);
} else if (fs.existsSync(PROJECT_DIST_PATH)) {
  // 项目名称已存在
  console.info(Colors.magenta("项目名称已存在"));
  process.exit(1);
}

const INDEX_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
`;
const INDEX_TEMPLATE = `import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./stores";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
`;
const INDEX_VUE_TEMPLATE = `<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
`;
const ROUTER_TEMPLATE = `import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});
`;
const STORE_TEMPLATE = `import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {}
});
`;
const VIEWS_TEMPLATE = `<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
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
export default class Home extends Vue {}
</script>
<style lang="scss"></style>
`;
const REGISTER_SERVICE_WORKER_TEMPLATE = `/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(process.env.BASE_URL + "service-worker.js", {
    ready() {
      console.log(
        "App is being served from cache by a service worker \\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
`;

// create files
fs.mkdirSync(`${PROJECT_DIST_PATH}`);

// <% project_name %> 目录下
process.chdir(`${PROJECT_DIST_PATH}`);
fs.writeFileSync(`main.ts`, INDEX_TEMPLATE);
fs.writeFileSync(`App.vue`, INDEX_VUE_TEMPLATE);
fs.writeFileSync(`index.html`, INDEX_HTML_TEMPLATE);
fs.writeFileSync(`registerServiceWorker.ts`, REGISTER_SERVICE_WORKER_TEMPLATE);

// <% project_name %>/stores 目录下
fs.mkdirSync(`${PROJECT_DIST_PATH}/stores`);
process.chdir(`${PROJECT_DIST_PATH}/stores`);
fs.writeFileSync(`index.ts`, STORE_TEMPLATE);

// <% project_name %>/routers 目录下
fs.mkdirSync(`${PROJECT_DIST_PATH}/routers`);
process.chdir(`${PROJECT_DIST_PATH}/routers`);
fs.writeFileSync(`index.ts`, ROUTER_TEMPLATE);

// <% project_name %>/views 目录下
fs.mkdirSync(`${PROJECT_DIST_PATH}/views`);
process.chdir(`${PROJECT_DIST_PATH}/views`);
fs.writeFileSync(`Home.vue`, VIEWS_TEMPLATE);

// exit
console.info(Colors.green(`已生成${PROJECT_NAME}项目`));
process.exit();
