<template>

  <div>

  <div>
    <div class="overview">
  <table>
    <tr class="column-header">
      <td></td>
      <td>Value</td>
      <td>Gain</td>
      <td>% of Portfolio</td>

    </tr>

    <tr  v-for="asset in assets"
    :key="asset.id">
    <td class="row-header">{{asset.nameOfAsset}}</td>
      <td :class="{green: asset.gain>1, red: asset.gain<0, orange: asset.gain <= 1}">{{ (asset.currentValue)}}</td>
      <td :class="{green: asset.gain>1, red: asset.gain<0, orange: asset.gain <= 1}">{{asset.gain + "%"}}</td>
      <td :class="{green: asset.gain>1, red: asset.gain<0, orange: asset.gain <= 1}">{{ (asset.currentValue/totalValuePortfolio *100).toFixed(1) + "%"}}</td>
    </tr>
    <tr>
      <td class="bottom-line" >Current Value of Portfolio </td>

    <td>{{totalValuePortfolio}}</td>
      <td :class="{green: totalGainInPortfolio>0, red: totalGainInPortfolio<0}">{{totalGainInPortfolio + "%"}}</td>
      <td>100%</td>
    </tr>
  <tr class="column-header">
    <td>Total gain in Stocks</td>
    <td></td>
    <td>{{totalGainOfStocksInPortfolio}}</td>
    <td></td>

  </tr>

    <button @click="submitTotalValue()"> Save total Value of Portfolio</button>
  </table>
    </div>

    <br>
    <br>

  <table>

      <tr>
        <td>Total Value over time</td>
        <td>Total Gain over time</td>
      </tr>


    <tr v-for="value in totalValues"
    :key="value.id"
    >
      <td>{{ (value.totalValue).toFixed(2) }}</td>
      <td>{{ (value.totalGain).toFixed(2) }}</td>

    </tr>
    </table>

  </div>



    <br>
    <br>

  <div class="chart-container">
    <line-chart :chart-data="dataCollection"></line-chart>
    <br>
    <br>
    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>


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
      dataCollection: {
        labels: [],
        datasets: [
          {
            data: [0, 969, 970],
            label: "Total value of Portfolio (in thousands)",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [0, 0.9, 1],
            label: "Total value of Portfolio (in thousands)",
            borderColor: "green",
            fill: false
          }
          ]
      },
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Stock", "Short-term bonds", "long-term bonds", "Pension" ,"Gold"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#00D8FF"],
            data: [15.4,31.0,0,52.6,0]
          }
        ]
      },
      assets: [],
      metrics: [],
      totalGains: [],
      totalValues: [],
      nameOfAsset: '',
      typeOfAsset: '',
      bucket: null,
      currentValue: null,
      gain: null,
      totalValue: null,
      totalGain: null,
      totalValueEachBucket: null,
      showDetails: false,
      shareStocks: 13,
      shareBondsShort: 13,
      shareBondsLong: 34,
      sharePension: 56

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
            this.totalValues = data
          })
          .then(() => {
            this.fetchData();
          })
          .catch(err => console.log(err.message))

  },


    submitTotalValue() {

      let keyMetricAsset = {totalValue: this.totalValuePortfolio, totalGain: this.totalGainInPortfolio};

      this.totalValues.push(this.totalValue);

      axios.post('http://localhost:5050/metrics', keyMetricAsset)
          .then(() => this.fetchMetrics())
          .catch(err => console.log(err.message));

    },
      togglePortfolio() {
        this.showDetails = !this.showDetails;
      },
    toArrayGains(){
      for(let i = 0; i < this.metrics.length; i++){
        this.totalValues.push(this.metrics[i].totalValue)
      }

    }

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

      },
      totalGainOfStocksInPortfolio() {
        let gainStocks = 0;


        return gainStocks.toFixed(1);

      }





      }




}
</script>

<style scoped>

th, td {
  padding: 10px;
  text-align: left;
}
tr:hover {background-color: #f5f5f5;}

.column-header{
  font-weight: bold ;
}
.row-header{
  font-weight: bold
}

div.overview {
  max-width: 500px;
  float: left;
  margin: auto;
  padding-left: 45px;
}

.bottom-line{
  border-top: 2px solid black;
  font-weight: bold ;
}

.chart-container{
  max-width: 500px;
  float: right;
  padding-right: 45px;
}
.orange{
  color: orange;
}
.green{
  color: green;
}

.red{
  color: red;

}



</style>