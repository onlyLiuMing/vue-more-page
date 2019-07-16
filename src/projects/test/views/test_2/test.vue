<template>
<div class="fx-test">
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
export default class test extends Vue {
  name = 'test';
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
  .fx-test{ }
</style>