<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Promised :promise="promise">
      <template v-slot:default>加载中</template>
      <template v-slot:resolved="{value}">
        <div>
          <span>res is: </span>
          <span>{{value}}</span>
        </div>
      </template>
      <template v-slot:rejected="{error}">
        <div>
          <span>error is: </span>
          <span>{{error}}</span>
        </div>
      </template>
    </Promised>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Promised from "./components/Promised.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Promised
  },
  data: () => ({
    promise: new Promise((resolve, reject) => {
      setTimeout(() => Math.random() > 0.5 ? resolve({
        value: 3
      }) : reject({
        msg: "unknown error"
      }), 3000);
    })
  })
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
