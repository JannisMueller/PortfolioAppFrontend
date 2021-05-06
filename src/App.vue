<template>
  <div id="app">



    <div id="nav">
      <router-link to="/bar">Bar</router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/updatePortfolio">Update Portfolio</router-link>

    </div>

    <router-view/>

  </div>
</template>

<script>


export default {
  name: 'App',
  components: {},
}


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
h1{
  border-bottom:  1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
