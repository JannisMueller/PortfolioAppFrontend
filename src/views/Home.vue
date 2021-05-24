<template>
  <div>
  <h1>{{ title }}</h1>
    <Overview></Overview>

    <Details/>




  </div>

</template>

<script>

import Details from "@/components/Details";
import Overview from "@/components/Overview";


export default {
  name: "Home.vue",
  components: {Overview, Details},

  data: function () {
    return {
      title: 'Portfolio Jannis Müller',
    }
  }
  }

</script>

<style scoped>


</style>


