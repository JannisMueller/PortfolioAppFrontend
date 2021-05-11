<template>
  <div>
  <h1>{{ title }}</h1>
    <h2>Overview Chart Portfolio</h2>
    <Details/>


  </div>

</template>

<script>
import Details from "@/components/Details";

export default {
  name: "Home.vue",
  components: { Details},
  data: function () {
    return {
      title: 'Portfolio Jannis Müller',

    }
  }
}
</script>

<style scoped>


</style>


