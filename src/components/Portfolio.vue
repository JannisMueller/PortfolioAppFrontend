
<template>

  <div>
      <table border="1px">
        <tr>
          <td>Name of Asset</td>
          <td>Type of Asset</td>
          <td>Initial Value</td>
          <td>Current Value</td>
          <td>Gains</td>
          <td>Action</td>


        </tr>

        <tr v-for="asset in assets"
            v-bind:key="asset.id"
        >
          <td>{{asset.nameOfAsset}}</td>
          <td>{{asset.typeOfAsset}}</td>
          <td>{{asset.initialValue}}</td>
          <td>{{asset.currentValue}}

          </td>
          <td>{{asset.gain}}</td>
          <td><button v-on:click="deleteAsset(asset.id)">Delete</button>
            <button @click="updateValue(asset.id)">Update</button>
          </td>

<!--            <label for="newCurrentValue"></label>
            <input
                id="newCurrentValue"
                placeholder="new Value"
                v-model="newCurrentValue"
                type="text"
            >-->


        </tr>

        <tr>
          <td><label for="nameOfAsset"> </label>
            <input
                id="nameOfAsset"
                placeholder="Name of Asset"
                v-model="nameOfAsset"
                type="text"
            >
          </td>

          <td>
            <label for="typeOfAsset"></label>
            <input
                id="typeOfAsset"
                placeholder="Type of Asset "
                v-model="typeOfAsset"
                type="text"
            >
          </td>

          <td
          ><p>
            <label for="initialValue"></label>
            <input
                id="initialValue"
                placeholder="Initial Value"
                v-model="initialValue"
                type="text"
            >
          </p></td>
          <td>
            <label for="currentValue"> </label>
            <input
                id="currentValue"
                placeholder="Current Valuet"
                v-model="currentValue"
                type="text"
            >
          </td>

          <td>
            <label for="gain"></label>
            <input
                id="gain"
                placeholder="gain"
                v-model="gain"
                type="text"
            >
          </td>
          <td><button @click="submit">Add asset to Portfolio</button></td>

        </tr>


      </table>

 </div>

</template>


<script>


import axios from "axios";

export default {
  name: "Portfolio",
  components: {},
  data: function () {
    return {
      showDetails: false,
      assets: [],
      nameOfAsset: '',
      typeOfAsset: '',
      initialValue: null,
      currentValue: null,
      gain: null,
      newCurrentValue: null


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
    deleteAsset: function (id) {
      axios.delete('http://localhost:5050/assets/' + id).then(() => {
        this.fetchData();
      })
    },
    submit() {
      let asset = {
        nameOfAsset: this.nameOfAsset, typeOfAsset: this.typeOfAsset,
        initialValue: this.initialValue, currentValue: this.currentValue, gain: this.gain
      }
      axios.post('http://localhost:5050/assets', asset)
          .catch(err => console.log(err.message));

      this.nameOfAsset = '';
      this.typeOfAsset = '';
      this.initialValue = null;
      this.currentValue = null;
      this.gain = null;
    },
    updateValue(id) {
      axios.patch('http://localhost:5050/assets/' + id, this.newCurrentValue).then(() => {
        this.fetchData()
      });

    }
    },
    mounted() {
      this.fetchData();
    }

  }


</script>




<style scoped>


</style>