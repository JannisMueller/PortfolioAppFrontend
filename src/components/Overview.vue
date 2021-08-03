<template>

  <div>

    <popup v-if="showModalAsset" :showModal=showModalAsset @clicked="onChildClickAsset" class="backdrop"></popup>
    <PopupAddPension v-if="showModalPension" :showModalPension=showModalPension @clicked="onChildClickPension" class="backdrop"></PopupAddPension>


    <div :class="{'overlay': showModalAsset, 'overlay': showModalPension, 'overview': !showModalAsset }">


  <table  class="table-container">
    <tr class="column-header">
      <td class="column-header"></td>
      <td class="column-header">Value</td>
      <td class="column-header">Gain</td>
      <td class="column-header">% of Portfolio</td>
      <td class="column-header"><label for="checkbox">Update Assets</label>
        <input type="checkbox" id="checkbox" v-model="checked">
      </td>

    </tr>

    <tr  v-for="asset in assets"
    :key="asset.id">
    <td class="row-header">{{asset.nameOfAsset}}
      <button class="icon"  v-on:click="deleteAsset(asset.id)">🗑</button>
    </td>
      <td :class="{green: asset.gain>1, red: asset.gain<0, orange: asset.gain <= 1}">{{ (asset.currentValue)}}</td>
      <td :class="{green: asset.gain>1, red: asset.gain<0, orange: asset.gain <= 1}">{{asset.gain + "%"}}</td>
      <td :class="{green: asset.gain>1, red: asset.gain<0, orange: asset.gain <= 1}">{{ (asset.currentValue/totalValuePortfolio *100).toFixed(1) + "%"}}</td>

      <td>

        <form v-if="checked" @submit.prevent="updateValue(asset.id)">

          <label :for="asset.id"

          ></label>
          <input
              :id="asset.id"
              v-model="newCurrentValue"
              placeholder="current value"
              type="text"
              :disabled="!checked">


          <label :for="asset.id"
          ></label>
          <input   :id="asset.id"
                   v-model="newGain"
                   type="text"
                   placeholder=" Gain in %"
                   :disabled="!checked">

        </form>

        <button class="button" v-if="checked" @click="updateValue(asset.id)">Update Value</button>
      </td>
    </tr>
    <tr >
      <td class="bottom-line" >Return of Portfolio </td>

    <td class="bottom-line" >{{ (totalValuePortfolio) + " kr"}}</td>
      <td class="bottom-line" :class="{green: totalGainInPortfolio>0, red: totalGainInPortfolio<0}">{{ (totalGainInPortfolio *100).toFixed(5) + "%"}}</td>
      <td class="bottom-line">100%</td>
      <td class="bottom-line"></td>
    </tr>
  <tr class="column-header">
    <td> avg. return Stocks</td>
    <td></td>
    <td :class="{green: totalGainOfStocksInPortfolio, red: totalGainOfStocksInPortfolio<0}">{{totalGainOfStocksInPortfolio + "%"}}</td>
    <td ></td>

  </tr>

      <button class="button" @click="submitTotalValue()"> Save total Value of Portfolio</button>

      <button class="button" @click="openModalAsset" v-if="!showModalAsset">Add Asset</button>



  </table>


  <div class="chart-container">
    <line-chart :chart-data="dataCollection" :options="options"></line-chart>
  </div>
    <div class="chart-container">
      <pie-chart :width="420" :height="250" :chart-data="chartData" :chart-options="chartOptions"></pie-chart>
    </div>

    <div>

      <table class="table-container-bucket">

        <tr class="column-header">
          <td class="column-header">Bucket 1</td>
          <td class="column-header">Bucket 2</td>
          <td class="column-header">Bucket 3</td>
          <td class="column-header">Bucket 4</td>
        <tr class="bg-emerald-200">
          <td>
            <ol>
              <li v-for="asset in bucketOne" :key="asset.id">{{asset.nameOfAsset}}</li>
            </ol>
          </td>

          <td>
            <ol>
              <li v-for="asset in bucketTwo" :key="asset.id">{{asset.nameOfAsset}}</li>
            </ol>
          </td>

          <td>
            <ol>
              <li v-for="asset in bucketThree" :key="asset.id">{{asset.nameOfAsset}}</li>
            </ol>
          </td>

          <td>
            <ol v-for="asset in bucketFour" :key="asset.id">
              <li>{{asset.nameOfAsset}}</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td class="bottom-line" >{{totalValueBucketOne + " kr"}}</td>
          <td class="bottom-line" >{{totalValueBucketTwo + " kr"}}</td>
          <td class="bottom-line" >{{totalValueBucketThree + " kr"}}</td>
          <td class="bottom-line" >{{totalValueBucketFour + " kr"}}</td>
        </tr>
      </table>
    </div>

      <progress-bar
          :options="options"
          :value="(this.totalValuePortfolio/4500000*100).toFixed(2)"> </progress-bar>

      <div>

          <table  class="table-container-pension">
            <tr class="column-header" >
              <td class="column-header"></td>
              <td class="column-header">Value</td>
              <td class="column-header">% of Pension</td>
              <td class="column-header"><label for="checkbox">Update Assets</label>
                <input type="checkbox" id="checkboxPension" v-model="checked"> </td>

            </tr>

            <tr  v-for="pension in pensionAsset"
                 :key="pension.id">
              <td class="row-header">{{pension.nameOfAsset}}</td>
              <td :class="{green: pension.gain>1, red: pension.gain<0, orange: pension.gain <= 1}">{{ (pension.currentValue)}}</td>
              <td :class="{green: pension.gain>1, red: pension.gain<0, orange: pension.gain <= 1}">{{ (pension.currentValue/totalValuePensionPortfolio *100).toFixed(1) + "%"}}</td>
              <td>

                <form v-if="checked" @submit.prevent="updatePension(pension.id)">

                  <label :for="pension.id"

                  ></label>
                  <input
                      :id="pension.id"
                      v-model="newCurrentValuePension"
                      placeholder="current value"
                      type="text"
                      :disabled="!checked">


                </form>

                <button class="button" v-if="checked" @click="updatePension(pension.id)">Update Value</button>
              </td>
            </tr>
            <tr>
              <td class="bottom-line" >Total </td>

              <td class="bottom-line" >{{ (totalValuePensionPortfolio) + " kr"}}</td>
              <td class="bottom-line">100%</td>
              <td class="bottom-line"></td>
            </tr>
            <button class="button" @click="openModalPension" v-if="!showModalPension">Add Asset</button>

        </table>

      </div>





    </div>
  </div>


</template>


<script>
import PieChart from "@/PieChart";
import LineChart from "@/LineChart";
import axios from "axios";
import Popup from "@/components/PopupAddAsset";
import PopupAddPension from "@/components/PopupAddPension";


export default {
  name: "Overview",
  components: {LineChart, PieChart, Popup, PopupAddPension},
  data: function () {
    return {
      options: {
        text: {
          color: '#0e0d0d',
          shadowEnable: false,
          shadowColor: '#000000',
          fontSize: 12,

          dynamicPosition: true,
          hideText: false
        },
        progress: {
          color: '#2d94bd',
          backgroundColor: '#FFFFFF',


        },
        layout: {
          height: 80,
          width: 672,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: 'line'
        }
      },
      dataCollection: [],
      chartOptions: [],
      chartData: [],
      assets: [],
      pensionAsset: [],
      metrics: [],
      totalGains: [],
      totalValues: [],
      stocks:  [],
      nameOfAsset: '',
      typeOfAsset: '',
      bucket: null,
      currentValue: null,
      gain: null,
      totalValue: null,
      totalGain: null,
      newGain: null,
      totalValueEachBucket: null,
      showDetails: false,
      totalGainInPortfolio: null,
      showModalAsset: false,
      showModalPension: false,
      newCurrentValue: null,
      checked: false,
      newCurrentValuePension:null

    }
  },
  methods: {

    updatePension(id) {
      axios.patch('http://localhost:5050/pension/' + id, {
        currentValue: this.newCurrentValuePension,
      }).then(() => {
        this.fetchPensionData();
      })
          .catch(err => console.log(err.response.data));
      this.newCurrentValuePension = '';
    },

      updateValue(id) {

      axios.patch('http://localhost:5050/assets/' + id, {
        currentValue: this.newCurrentValue,
        gain: this.newGain


      }).then(() => {
        this.fetchData();
      })
          .catch(err => console.log(err.response.data));
      this.newCurrentValue = '';
      this.newGain = '';
      this.checked = false;

    },



    onChildClickAsset () {
      this.showModalAsset = false;
      this.fetchData();
    },
    onChildClickPension () {
      this.showModalPension = false;
      this.fetchPensionData();
    },

    openModalAsset() {
      this.showModalAsset = true;
    },
    openModalPension() {
      this.showModalPension= true;
    },

    fetchData() {
     axios.get('http://localhost:5050/assets')
          .then((response) => {

            this.assets = response.data;
            this.stocks = response.data;

          })
          .catch(err => console.log(err.message))

    },

    fetchPensionData() {
      axios.get('http://localhost:5050/pension')
          .then((response) => {

            this.pensionAsset = response.data;


          })
          .catch(err => console.log(err.message))

    },
    deleteAsset: function (id) {
      axios.delete('http://localhost:5050/assets/' + id).then(() => {
        this.fetchData();
      })
    },
    async fetchMetrics() {
      axios.get('http://localhost:5050/metrics')
          .then(response => {

            this.metrics = response.data;
            let data = response.data.map(value => value.totalValue);
            let labels = response.data.map(time => time.id);

            this.calculateTotalGainInPortfolio();
            let shareOfStocks = ((this.totalValueBucketThree/this.totalValuePortfolio)*100).toFixed(2);
            let shareOfShort = ((this.totalValueBucketOne/this.totalValuePortfolio)*100).toFixed(2);
            let shareOfLong = ((this.totalValueBucketTwo/this.totalValuePortfolio)*100).toFixed(2);
            this.updateChart(data,labels,shareOfStocks,shareOfShort,shareOfLong);
          })
  },

    updateChart(data,labels,shareOfStocks,shareOfShort,shareOfLong) {

      this.chartOptions = {
        hoverBorderWidth: 20,
        responsive: false,
        maintainAspectRatio: false,
        fill: true
      },
          this.chartData = {
            hoverBackgroundColor: "red",
            hoverBorderWidth: 10,
            labels: ["Stock", "Short-term bonds", "long-term bonds"],
            datasets: [
              {
                label: "Data One",
                backgroundColor: ["#4196b8", "#5160e4", "#00D8FF", "#00D8FF"],
                data: [shareOfStocks, shareOfShort, shareOfLong]
              }
            ]
          },

          this.options = {

              responsive: true,
              maintainAspectRatio: false,
          },

          this.dataCollection = {

              labels: labels,

              datasets: [
                {
                  data: data,
                  label: "Total value of Portfolio ",
                  borderColor: "#3e95cd",
                  fill: false
                }
              ]
            }

    },


    submitTotalValue() {

      let keyMetricAsset = {totalValue: this.totalValuePortfolio, totalGain: this.totalGainInPortfolio};

      axios.post('http://localhost:5050/metrics', keyMetricAsset)
          .then(() => this.fetchMetrics())
          .catch(err => console.log(err.message));

    },

    calculateTotalGainInPortfolio() {

      this.totalGainInPortfolio = (this.metrics[this.metrics.length-1].totalValue-this.metrics[this.metrics.length-2].totalValue)/this.metrics[this.metrics.length-2].totalValue

    },

    },
  mounted() {
      this.fetchData();
      this.fetchMetrics();
      this.fetchPensionData();


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
        return sum.toFixed(0);


      },

      totalValuePensionPortfolio() {
        let sum = 0;
        for (let i = 0; i < this.pensionAsset.length; i++) {
          sum = sum + this.pensionAsset[i].currentValue;

        }
        return sum.toFixed(0);

      },

      totalGainOfStocksInPortfolio() {

        let totalGain = 0;
        let gainStocks = 0;
        let counter = 0;

        for (let i = 0; i < this.stocks.length; i++) {
          if((this.stocks[i].bucket === 3)) {
            totalGain = totalGain + (this.stocks[i].gain)
          }

            if((this.stocks[i].bucket === 3)){

            gainStocks = gainStocks + (this.stocks[i].gain);
            counter = counter +1;

            }

        }
        return (gainStocks/counter).toFixed(1)

      }
    }


}
</script>

<style scoped>

th, td {
  padding: 5px;
  text-align: left;
  font-size: 12px;
}
tr:hover {background-color: #f5f5f5;}

.column-header{
  font-weight: bold;
  border-bottom: 2px solid black;
}
.row-header{
  font-weight: bold
}

li{
  font-size: 12px;
}

div.overview {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 10px;
  row-gap: 50px;
  justify-content: center;
}

.bottom-line{
  border-top: 2px solid black;
  font-weight: bold ;
}

.chart-container{
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-radius:6px;
  -moz-border-radius:6px;
  padding: 12px;
  height: 420px;

}


.table-container-bucket{
  text-align: left;
  table-layout: fixed;
  border-radius:6px;
  -moz-border-radius:6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  padding: 12px;
  height: 420px;
  width: 100%;
}

canvas{
  width:420px !important;
  height:420px !important;
}


.table-container{
  padding: 12px;
  table-layout: fixed;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius:6px;
  -moz-border-radius:6px;
  height: 448px;


}

.table-container-pension{
  padding: 12px;
  table-layout: fixed;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius:6px;
  -moz-border-radius:6px;
  height: 420px;
  width: 100%;

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
.button {
  background-color: #4c93af; /* Green */
  border: none;
  color: white;
  padding: 8px 8px;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  float: left;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition-duration: 0.4s;

}

.button:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}

.backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:6px;
  -moz-border-radius:6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  z-index: 999;



}

.modal {

  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
}
.icon {
  border: white;
  background-color: white;
  font-size: 10px;
}

div.overlay{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 10px;
  row-gap: 50px;
  justify-content: center;
  filter: blur(5px);
}

</style>