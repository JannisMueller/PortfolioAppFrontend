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


  </div>

</template>



<script>
import axios from "axios";

export default {
  name: "Portfolio",
  data: function () {
    return {
      assets: []
    }
  },
  methods: {
    deleteAsset(){
      axios.delete()
    }
  },
  mounted() {
    fetch('http://localhost:5050/assets')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.assets = data;
        });
  }

  }

</script>




<style scoped>

</style>