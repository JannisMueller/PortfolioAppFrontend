<template>


    <div>
      <table class="table-container-bucket" border="1px">
        <tr>
          <td>Name of Asset</td>
          <td>Type of Asset</td>
          <td>Current Value</td>
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
          <td>{{asset.currentValue}}</td>
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

            </form>
            <button v-if="checked" @click="updateValue(asset.id)">Update Value</button>
          </td>
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
                type="select"

            >
          </td>


          <td>
            <label for="currentValue"> </label>
            <input
                id="currentValue"
                placeholder="Current Valuet"
                v-model="currentValue"
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
  name: "PortfolioAsset",
  data: function () {
    return {
      showDetails: false,
      assets: [],
      nameOfAsset: '',
      typeOfAsset: '',
      currentValue: null,
      newCurrentValue: null,
      checked: false,
      clearInput: false,

    }
  },

  methods: {
    fetchData() {
      axios.get('http://localhost:5050/pension')
          .then((response) => {
            this.assets = response.data
          }).then(() => {
        this.fetchData();
      })
          .catch(err => console.log(err.message))
    },


    deleteAsset: function (id) {
      axios.delete('http://localhost:5050/pension/' + id).then(() => {
        this.fetchData();
      })
    },
    submit() {
      if(!this.clearInput) {

        let asset = {
          nameOfAsset: this.nameOfAsset, typeOfAsset: this.typeOfAsset,
          currentValue: this.currentValue
        }
        axios.post('http://localhost:5050/pension', asset)
            .catch(err => console.log(err.message));

        this.nameOfAsset = '';
        this.typeOfAsset = '';
        this.currentValue = null;

      } else{
        this.clearRows();
      }
    },
    updateValue(id) {

      axios.patch('http://localhost:5050/pension/' + id, {
        currentValue: this.newCurrentValue,


      })
      .catch(err => console.log(err.response.data));
      this.newCurrentValue = '';

    },
    clearRows() {
      this.clearInput=!this.clearInput;
      this.nameOfAsset = '';
      this.typeOfAsset = '';
      this.currentValue = null;


    },

  },
  mounted() {
    this.fetchData();
  }

}




</script>

<style scoped>
.table-container-bucket{
    max-width: 800px;
  }

</style>