<template>
  <div>
  <h1>{{ title }}</h1>
    <Portfolio/>
  </div>
</template>

<script>
import Portfolio from "@/components/Portfolio";
export default {
  name: "Home.vue",
  components: {Portfolio},
  data: function () {
    return {
      title: 'Portfolio Jannis Müller',

    }
  }
}
</script>

<style scoped>


</style>


