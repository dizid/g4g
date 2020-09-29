<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/clashroyale">Clash Royale</router-link> |
      <router-link to="/fortnite">Fortnite</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
/* import home from "./views/Home.vue"; */

export default {
  name: "App"
  /*   data() {
    return {
      slug: "clashroyale"
    };
  } */
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
