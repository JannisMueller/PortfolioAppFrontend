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
      <td>Total Value of Portfolio </td>
    <td>{{totalValuePortfolio}}</td>
      <td>{{totalGainInPortfolio}}</td>
    </tr>
    <button @click="submitTotalValue"> Save total Value of Portfolio</button>
  </table>

    <br>
    <br>

    <table>

      <tr>
        <td>Total Value over time</td>
        <td>Total Gain over time</td>
      </tr>


    <tr v-for="metric in metrics"
    :key="metric.id"
    >
      <td>{{metric.totalValue}}</td>
      <td>{{metric.totalGain}}</td>
    </tr>
    </table>

  </div>

    <br>
    <br>

    <table>

      <tr>
        <td>Bucket 1</td>
        <td>Bucket 2</td>
        <td>Bucket 3</td>
        <td>Bucket 4</td>


      <tr>
        <td>
          <ol>
          <li v-for="asset in bucketOne" :key="asset.id">{{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
          <p>Total:{{totalValueBucketOne}} </p>
        </td>

        <td>
          <ol>
          <li v-for="asset in bucketTwo" :key="asset.id">{{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
          <p>Total:{{totalValueBucketTwo}} </p>
        </td>

        <td>
          <ol>
          <li v-for="asset in bucketThree" :key="asset.id">{{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
          <p>Total:{{totalValueBucketThree}} </p>
        </td>

        <td>
          <ol v-for="asset in bucketFour" :key="asset.id">
          <li> {{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
          <p>Total:{{totalValueBucketFour}} </p>
        </td>


      </tr>

    </table>

    <br>
    <br>


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
import axios from "axios";
export default {
  name: "Overview",
  components: {LineChart, PieChart},
  data: function () {
    return {
      datacollection: {
        labels: ["week 20/2021", "week 21/2021", "week 22/2021"],
        datasets: [
          {
            data: [45.6, 35.6, 49.6],
            label: "Total value of Portfolio (in thousands)",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [34, 28, 43],
            label: "Total Gain of Portfolio in %",
            borderColor: "#8e5ea2",
            fill: false
          },

        ]
      },
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Stock", "Short-term bonds", "long-term bonds", "Gold"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#00D8FF"],
            data: [33, 67, 0, 0]
          }
        ]
      },
      assets: [],
      metrics: [],
      nameOfAsset: '',
      typeOfAsset: '',
      bucket: null,
      currentValue: null,
      gain: null,
      totalValue: null,
      totalGain: null,
      totalValueEachBucket: null

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
    fetchMetrics() {
      fetch('http://localhost:5050/metrics')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            this.metrics = data
          })
          .then(() => {
            this.fetchData();
          })
          .catch(err => console.log(err.message))

    },

    submitTotalValue() {

      let keyMetricAsset = {totalValue: this.totalValuePortfolio, totalGain: this.totalGainInPortfolio}

      axios.post('http://localhost:5050/metrics', keyMetricAsset)
          .then(() => this.fetchMetrics())
          .catch(err => console.log(err.message));

    }
  },
  mounted() {
    this.fetchData();
    console.log(this.assets.bucket)
    this.fetchMetrics();
  },

  computed: {

    bucketOne: function () {

      let bucket = this.assets.filter(asset => asset.bucket === 1);
      return bucket
    },
    bucketTwo: function () {

      let bucket = this.assets.filter(asset => asset.bucket === 2);
      return bucket
    },
    bucketThree: function () {

      let bucket = this.assets.filter(asset => asset.bucket === 3);
      return bucket
    },
    bucketFour: function () {

      let bucket = this.assets.filter(asset => asset.bucket === 4);
      return bucket
    },
    totalValueBucketOne: function () {
      let sum = 0;
      for (var i = 0; i < this.bucketOne.length; i++) {
        sum = sum + this.bucketOne[i].currentValue;

      }
      return sum;
    },
    totalValueBucketTwo: function () {
      let sum = 0;
      for (var i = 0; i < this.bucketTwo.length; i++) {
        sum = sum + this.bucketTwo[i].currentValue;

      }
      return sum;
    },
    totalValueBucketThree: function () {
      let sum = 0;
      for (var i = 0; i < this.bucketThree.length; i++) {
        sum = sum + this.bucketThree[i].currentValue;

      }
      return sum;
    },
    totalValueBucketFour: function () {
      let sum = 0;
      for (var i = 0; i < this.bucketFour.length; i++) {
        sum = sum + this.bucketFour[i].currentValue;

      }
      return sum;
    },

    totalValuePortfolio() {
      let sum = 0;
      for (var i = 0; i < this.assets.length; i++) {
        sum = sum + this.assets[i].currentValue;

      }
     return sum;


    },
    totalGainInPortfolio() {
      let gain = 0;
      for (var i = 0; i < this.assets.length; i++) {
        gain = ((gain + this.assets[i].gain) / (this.assets.length - 1));

      }
      return gain;

    }
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