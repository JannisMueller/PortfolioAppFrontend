<template>

  <div>


    <div v-if="showDetails">
      <p>4 Hinka details</p>
      <button @click="togglePortfolio">Close Details</button>

    </div>
    <button v-if="!showDetails" @click="togglePortfolio">Show Details</button>


  </div>

</template>

<script>
export default {
name: "Details",
  data: function () {
    return {
      showDetails: false
  }
  },

  methods: {
    togglePortfolio(){
      this.showDetails = !this.showDetails;
    }
  }
}
</script>

<style scoped>

</style>