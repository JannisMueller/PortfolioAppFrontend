<template>


    <div>
<ol>
          <li>
          <label for="nameOfAsset"></label>
            <input
                id="nameOfAsset"
                placeholder="Name of Asset"
                v-model="nameOfAsset"
                type="text"
            >
          </li>

  <li>
            <label for="typeOfAsset"></label>
            <input
                id="typeOfAsset"
                placeholder="Type of Asset "
                v-model="typeOfAsset"
                type="select"

            >

  </li>

  <li>
            <label for="bucket"></label>
            <input
                id="bucket"
                placeholder="Bucket"
                v-model="bucket"
                type="number"
            >
  </li>

  <li>
      <label for="initialValue"></label>
      <input
          id="initialValue"
          placeholder="Initial Value"
          v-model="initialValue"
          type="text"
      >
  </li>

  <li>


      <label for="currentValue"></label>
            <input
                id="currentValue"
                placeholder="Current Value"
                v-model="currentValue"
                type="text"
            >
  </li>

  <li>

            <label for="gain"></label>
            <input

                id="gain"
                placeholder="Gain in %"
                v-model="gain"
                type="text"
                :disabled="false"
            >

  </li>

          <button class="button_clear" @click="clearRows"> clear input</button>
          <button class="button_add" @click="submit">Add asset to Portfolio</button>

</ol>


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
      bucket: '',
      currentValue: null,
      initialValue: null,
      gain: null,
      newGain: null,
      newCurrentValue: null,
      checked: false,
      clearInput: false,

    }
  },

  methods: {


    submit() {
      if(!this.clearInput) {

        let asset = {
          nameOfAsset: this.nameOfAsset, typeOfAsset: this.typeOfAsset, bucket: this.bucket,
          currentValue: this.currentValue, initialValue: this.initialValue, gain: this.gain
        }
        axios.post('http://localhost:5050/assets', asset)
            .catch(err => console.log(err.message));

        this.nameOfAsset = '';
        this.typeOfAsset = '';
        this.bucket= ''
        this.currentValue = null;
        this.gain = null;
        this.fetchData();

      } else{
        this.clearRows();
      }
    },

    clearRows() {
      this.clearInput=!this.clearInput;
      this.nameOfAsset = '';
      this.typeOfAsset = '';
      this.currentValue = null;
      this.initialValue = null;
      this.bucket= '';
      this.gain = null;

    },
    fetchData() {
      axios.get('http://localhost:5050/assets')
          .then((response) => {

            this.assets = response.data;
            this.stocks = response.data;

          })
          .catch(err => console.log(err.message))

    }

  },
  mounted() {
    this.fetchData();

  }

}




</script>

<style scoped>

li {
  list-style-type: none;
  text-align: left;


}

input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
}


.button_add {
  background-color: #4c93af; /* Green */
  border: none;
  color: white;
  padding: 8px 8px;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  float: left;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition-duration: 0.4s;
  position: absolute;
  top: 86%;
  left: 42%;

}

.button_add:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}

.button_clear {
  background-color: #4c93af; /* Green */
  border: none;
  color: white;
  padding: 8px 8px;
  margin-right: 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  float: left;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition-duration: 0.4s;
  position: absolute;
  top: 80%;
  left: 47%;

}

.button_clear:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}

</style>