<template>

  <div>

  <div>
  <table>
    <tr>
      <td>Assets</td>
      <td>Value</td>
      <td>Gain</td>
      <td>% of Portfolio</td>
    </tr>

    <tr v-for="asset in assets"
    :key="asset.id">
    <td>{{asset.nameOfAsset}}</td>
      <td>{{ (asset.currentValue)}}</td>
      <td>{{asset.gain + "%"}}</td>
      <td>{{ (asset.currentValue/totalValuePortfolio *100).toFixed(1) + "%"}}</td>
    </tr>
    <tr>
      <td>Total Value of Portfolio </td>
    <td>{{totalValuePortfolio}}</td>
      <td>{{totalGainInPortfolio + "%"}}</td>
      <td>100%</td>
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
      <td>{{ (metric.totalValue).toFixed(2) }}</td>
      <td>{{ (metric.totalGain).toFixed(2) + "%" }}</td>
    </tr>
    </table>

  </div>

    <br>
    <br>

  <div>

    <table v-if="showDetails">

      <tr>
        <td>Bucket 1</td>
        <td>Bucket 2</td>
        <td>Bucket 3</td>
        <td>Bucket 4</td>
      <tr class="bg-emerald-200">
        <td>
          <ol>
          <li v-for="asset in bucketOne" :key="asset.id">{{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
        </td>

        <td>
          <ol>
          <li v-for="asset in bucketTwo" :key="asset.id">{{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
        </td>

        <td>
          <ol>
          <li v-for="asset in bucketThree" :key="asset.id">{{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
        </td>

        <td>
          <ol v-for="asset in bucketFour" :key="asset.id">
          <li> {{asset.nameOfAsset}} {{asset.currentValue}}</li>
          </ol>
        </td>
      </tr>
      <tr>
        <td>{{totalValueBucketOne}}</td>
        <td>{{totalValueBucketTwo}}</td>
        <td>{{totalValueBucketThree}}</td>
        <td>{{totalValueBucketFour}}</td>
      </tr>
      <button @click="togglePortfolio">Close Bucket-view</button>
    </table>
    <button v-if="!showDetails" @click="togglePortfolio">Show Bucket-view</button>

  </div>

    <br>
    <br>

  <div class="chart-container">
    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>

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
      totalValueEachBucket: null,
      showDetails: false


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

    },
      togglePortfolio() {
        this.showDetails = !this.showDetails;
      },
    },
    mounted() {
      this.fetchData();
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
        return sum.toFixed(2);
      },
      totalValueBucketTwo: function () {
        let sum = 0;
        for (var i = 0; i < this.bucketTwo.length; i++) {
          sum = sum + this.bucketTwo[i].currentValue;

        }
        return sum.toFixed(2);
      },

      shareOfPortfolio: function (id) {
        let share = this.currentValue[id] / this.totalValuePortfolio
        return share;
      },
      totalValueBucketThree: function () {
        let sum = 0;
        for (let i = 0; i < this.bucketThree.length; i++) {
          sum = sum + this.bucketThree[i].currentValue;

        }
        return sum.toFixed(2);
      },
      totalValueBucketFour: function () {
        let sum = 0;
        for (let i = 0; i < this.bucketFour.length; i++) {
          sum = sum + this.bucketFour[i].currentValue;

        }
        return sum.toFixed(2);
      },

      totalValuePortfolio() {
        let sum = 0;
        for (let i = 0; i < this.assets.length; i++) {
          sum = sum + this.assets[i].currentValue;

        }
        return sum.toFixed(2);


      },
      totalGainInPortfolio() {
        let gain = 0;
        for (let i = 0; i < this.assets.length; i++) {
          gain = ((gain + this.assets[i].gain) / (this.assets.length - 1));

        }
        return gain.toFixed(1);

      }
    }

}
</script>

<style scoped>



#overview{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chart-container{
  max-width: 500px;
}


</style>