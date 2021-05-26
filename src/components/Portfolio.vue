
<template>

  <div>
      <table border="1px">
        <tr>
          <td>Name of Asset</td>
          <td>Type of Asset</td>
          <td>Bucket</td>
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
          <td>{{asset.bucket}}</td>
          <td>{{asset.currentValue}}</td>
          <td>{{asset.gain + "%"}}</td>
          <td><button v-on:click="deleteAsset(asset.id)">Delete</button></td>
          <td>


            <form @submit.prevent="updateValue(asset.id)">

              <p>
                <label :for="asset.id"

                ></label>
                <input
                    :id="asset.id"
                    v-model="newCurrentValue"
                    placeholder="current value"
                    type="text"
                    :disabled="!checked">
               </p>
              <p>
                <label :for="asset.id"
                ></label>
                <input   :id="asset.id"
                         v-model="newGain"
                         type="text"
                         placeholder=" Gain in %"
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
                type="select"

            >
          </td>

          <td
          ><p>
            <label for="bucket"></label>
            <input
                id="bucket"
                placeholder="bucket"
                v-model="bucket"
                type="number"
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
                placeholder="Gain in %"
                v-model="gain"
                type="text"
                :disabled="false"
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
      bucket: '',
      currentValue: null,
      gain: null,
      newGain: null,
      newCurrentValue: null,
      checked: false,
      clearInput: false,

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
          nameOfAsset: this.nameOfAsset, typeOfAsset: this.typeOfAsset, bucket: this.bucket,
          currentValue: this.currentValue, gain: this.gain
        }
        axios.post('http://localhost:5050/assets', asset)
            .catch(err => console.log(err.message));

        this.nameOfAsset = '';
        this.typeOfAsset = '';
        this.bucket= ''
        this.currentValue = null;
        this.gain = null;

      } else{
        this.clearRows();
      }
    },
    updateValue(id) {

      axios.patch('http://localhost:5050/assets/' + id, {
        currentValue: this.newCurrentValue,
        gain: this.newGain

      })
          .catch(err => console.log(err.response.data));
      this.newCurrentValue = '';
      this.newGain='';

    },
    clearRows() {
      this.clearInput=!this.clearInput;
      this.nameOfAsset = '';
      this.typeOfAsset = '';
      this.currentValue = null;
      this.gain = null;

    },

    },
    mounted() {
      this.fetchData();
    }

}

</script>




<style scoped>


</style>