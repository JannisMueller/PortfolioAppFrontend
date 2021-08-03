<template>


  <div>
    <h2>Add Asset to Pension</h2>
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


        <label for="currentValue"></label>
        <input
            id="currentValue"
            placeholder="Current Value"
            v-model="currentValue"
            type="text"
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
name: "UpdatePensionPortfolio",
  data: function () {
    return {
      showDetails: false,
      pension: [],
      nameOfAsset: '',
      typeOfAsset: '',
      currentValue: null,
      newCurrentValue: null,
      checked: false,
      clearInput: false,

    }
  },

  methods: {


    submit() {
      if(!this.clearInput) {

        let pension = {
          nameOfAsset: this.nameOfAsset, typeOfAsset: this.typeOfAsset,
          currentValue: this.currentValue,
        }
        axios.post('http://localhost:5050/pension', pension)
            .catch(err => console.log(err.message));

        this.nameOfAsset = '';
        this.typeOfAsset = '';
        this.currentValue = null;

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


    },
    fetchData() {
      axios.get('http://localhost:5050/pension')
          .then((response) => {

            this.pension = response.data;


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
  text-align: center;


}

input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 12px;
  display: block;


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
  top: 84%;
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
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  transition-duration: 0.4s;
  position: absolute;
  top: 90%;
  left: 48%;

}

.button_clear:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}

</style>