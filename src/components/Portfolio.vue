
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
          <td><label for="checkbox">Update Assets</label>
            <input type="checkbox" id="checkbox" v-model="checked">
          </td>


        </tr>

        <tr v-for="asset in assets"
            v-bind:key="asset.id"

        >
          <td>{{asset.nameOfAsset}}</td>
          <td>{{asset.typeOfAsset}}</td>
          <td>{{asset.initialValue}}</td>
          <td>{{asset.currentValue}}</td>
          <td>{{asset.gain}}</td>
          <td><button v-on:click="deleteAsset(asset.id)">Delete</button></td>
          <td>


            <form @submit.prevent="updateValue(asset.id)">

              <p>
                <label :for="asset.id"
                >Current Value </label>
                <input
                    :id="asset.id"
                    v-model="newCurrentValue"
                    type="text"
                    :disabled="!checked">

              </p>
            </form>
            <button v-if="checked" @click="updateValue(asset.id)">Update Value</button>
          </td>

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
        <td><button @click="clearRows"> clear input</button></td>
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
      newCurrentValue: null,
      checked: false,
      clearInput: false,
      computedGains:0

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
      if(!this.clearInput) {

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
      } else{
        this.clearRows();
      }
    },
    updateValue(id) {
      console.log("in function update");
      console.log("new Value: " + this.newCurrentValue)
      console.log("id " + id)

      axios.patch('http://localhost:5050/assets/' + id, {
        currentValue: this.newCurrentValue
      })
          .catch(err => console.log(err.response.data));
      this.newCurrentValue = '';

    },
    clearRows() {
      this.clearInput=!this.clearInput;
      this.nameOfAsset = '';
      this.typeOfAsset = '';
      this.initialValue = null;
      this.currentValue = null;
      this.gain = null;
    }
    },
    mounted() {
      this.fetchData();
    }

}

</script>




<style scoped>


</style>