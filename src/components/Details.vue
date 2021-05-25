<template>

  <div>


<!--    <div v-if="showDetails">-->

      <table>

        <tr>
          <td>Bucket 1</td>
          <td>Bucket 2</td>
          <td>Bucket 3</td>
          <td>Bucket 4</td>
        </tr>


        <tr v-for="asset in assets"
            :key="asset.id"
        >
          {{asset.nameOfAsset}}
        </tr>

      </table>

<!--      <button @click="togglePortfolio">Close Details</button>-->

    </div>
<!--    <button v-if="!showDetails" @click="togglePortfolio">Show Details</button>-->



</template>

<script>
export default {
name: "Details",
  components:{
  },

  data: function () {
    return {
      showDetails: false,
      assets: [],
      nameOfAsset: '',
      typeOfAsset: '',
      bucket: '',
      currentValue: null,
      gain: null,
      totalValue: null,
      totalGain: null
  }
  },

  methods: {
    togglePortfolio() {
      this.showDetails = !this.showDetails;
    },
      fetchBucketData() {
        fetch('http://localhost:5050/assets')
            .then((response) => {
              return response.json()
            })
            .then((data) => {
              this.assets = data
            })
            .then(() => {
              this.fetchBucketData();
            })
            .catch(err => console.log(err.message))

      },
      mounted() {
        this.fetchBucketData()
      }
    }
  }

</script>

<style scoped>

td{
  alignment: left;
  border: #9f593f solid 1px;
}

</style>