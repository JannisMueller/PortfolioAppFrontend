<template>

  <div>
   <div>
      <ul>
        <li
            v-for="(asset) in assets"
            v-bind:key="asset.id"
        >
          {{asset.typeOfAsset + ": " }} {{asset.gain + "€"}} {{asset.nameOfAsset}}

        </li>
      </ul>
     <button @click="togglePortfolio">Close Portfolio</button>
    <button v-if="!showDetails" @click="togglePortfolio">Show Details</button>


    </div>
 </div>

</template>


<script>

export default {
  name: "Portfolio",
  components: {},
  data: function () {
    return {
      showDetails: false,
      assets: [],
      nameOfAsset: '',
      typeOfAsset: '',
      initialValue: 0,
      currentValue: 0,
      gain: 0

    }
  },
  methods: {

    togglePortfolio(){
      this.showDetails = !this.showDetails;
    }
    },
    mounted() {
      fetch('http://localhost:5050/assets')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            this.assets = data
          })
          .catch(err => console.log(err.message))

    }
}


</script>




<style scoped>

</style>