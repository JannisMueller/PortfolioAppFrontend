<template>
  <div>
  <h1>{{ title }}</h1>

    <Overview></Overview>






  </div>

</template>

<script>

import Overview from "@/components/Overview";


export default {
  name: "Home.vue",
  components: {Overview},

  data: function () {
    return {
      title: 'Portfolio Jannis Müller',
    }
  }
  }

</script>

<style scoped>


</style>


