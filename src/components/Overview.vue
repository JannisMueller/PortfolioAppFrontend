<template>

  <div>
  <div class="overview">
  <table>
    <tr>
      <td>Assets</td>
      <td>Value</td>
      <td>Gain</td>
    </tr>

    <tr v-for="asset in assets"
    :key="asset.id">
    <td>{{asset.nameOfAsset}}</td>
      <td>{{asset.currentValue + " kr"}}</td>
      <td>{{asset.gain + "%"}}</td>
    </tr>
    <tr>
      <td>Show Total Value of Portfolio <button @click="totalValuePortfolio"></button> </td>
    <td>{{this.totalValue}}</td>
      <td>{{this.totalGain}}</td>
    </tr>

  </table>
  </div>
  <div>
    <pie-chart class="chart-container" :data="chartData" :options="chartOptions"></pie-chart>
  </div>
  <div>
    <line-chart :chart-data="datacollection"></line-chart>
  </div>

  </div>
</template>


<script>
import PieChart from "@/PieChart";
import LineChart from "@/LineChart";
export default {
  name: "Overview",
  components: {LineChart, PieChart},
  data: function () {
    return {
      datacollection: {
        labels: ["week 20/2021", "week 21/2021", "week 22/2021"],
        datasets: [
          {
            data: [this.totalValue],
            label: "Total value of Portfolio",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [this.totalGain],
            label: "Total Gain of Portfolio in %",
            borderColor: "#8e5ea2",
            fill: false
          },

        ]
      },
      chartOptions: {
        hoverBorderWidth: 20,
        responsive:true
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Stock", "Short-term bonds", "long-term bonds","Gold"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF" , "#00D8FF"],
            data: [33,67, 0,0]
          }
        ]
      },
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
    fetchData() {
      fetch('http://localhost:5050/assets')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            this.assets = data
          })
          .then(() => {
            this.fetchData();
          })
          .catch(err => console.log(err.message))

    },
    totalValuePortfolio(){
      let sum = 0;
      let gain=0;
      for(var i = 0; i < this.assets.length; i++)
      {
        sum = sum + this.assets[i].currentValue;
        gain = ((gain + this.assets[i].gain)/(this.assets.length-1));

      }
      this.totalValue = sum;
      this.totalGain = gain;
    }
    },
    mounted(){
      this.fetchData();
    }
}
</script>

<style scoped>

.overview{
  border: solid 1px green;
  width: 36%;
  margin: 100px auto;

}

td{
  alignment: left;
  border: #9f593f solid 1px;
}

#overview{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



</style>