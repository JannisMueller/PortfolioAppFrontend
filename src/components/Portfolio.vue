<template>
  <div>
    <p>HERE COMES THE PORTFOLIO</p>
    <ul>
      <li
          v-for="asset in assets"
          v-bind:key="asset.id"
      >
          {{asset.typeOfAsset + ": " }} {{asset.gain + "€"}} {{asset.nameOfAsset}}

          </li>
    </ul>
    <button @click="created">add asset</button>


  </div>

</template>



<script>
import axios from "axios";

export default {
  name: "Portfolio",
  data: function () {
    return {
      assets: [],
      nameOfAsset: '',
      typeOfAsset: '',
      initialValue: 0,
      currentValue: 0,
      gain:0

    }
  },
  methods: {
    fetchData(){
      fetch('http://localhost:5050/assets')
          .then((response) => {return response.json()})
          .then((data) => {this.assets = data })
          .catch(err => console.log(err.message))
    },
    created(){
      let asset = {nameOfAsset: "Axios", typeOfAsset: "Axios", initialValue: 100, currentValue:100, gain:0}
      axios.post('http://localhost:5050/assets',asset)
          .catch(err => console.log(err.message))
          .finally(() => {
            this.fetchData();
          })
    }
  },
  mounted() {
   this.fetchData();

  }

  }

</script>




<style scoped>

</style>