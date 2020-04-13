<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <Scroll :list="data" v-slot="{item}">
      {{item}}
    </Scroll>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import Scroll from "./components/Scroll.vue";

export default Vue.extend({
  name: "App",
  components: {
    // HelloWorld
    Scroll
  },
  data: (): { data: number[]} => ({
    data: []
  }),
  mounted() {
    for (let i = 0; i < 200; i++) {
      this.data.push(i);
    }
  }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px 0;
  // margin-top: 60px;
}
</style>
