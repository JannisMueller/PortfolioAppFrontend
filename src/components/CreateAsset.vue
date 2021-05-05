<template>

  <div>

  <form id="createAsset" @submit.prevent="submit">

    <p>
      <label for="nameOfAsset">Name Asset </label>
      <input
      id="nameOfAsset"
      v-model="nameOfAsset"
      type="text"
      >
    </p>

    <p>
      <label for="typeOfAsset">Type of Asset </label>
      <input
          id="typeOfAsset"
          v-model="typeOfAsset"
          type="text"
      >
    </p>

    <p>
      <label for="initialValue"> Initial Value </label>
      <input
          id="initialValue"
          v-model="initialValue"
          type="text"
      >
    </p>

    <p>
      <label for="currentValue">Current Value </label>
      <input
          id="currentValue"
          v-model="currentValue"
          type="text"
      >
    </p>

    <p>
      <label for="gain">Gain </label>
      <input
          id="gain"
          v-model="gain"
          type="text"
      >
    </p>

  </form>
  <button @click="submit">Add asset to Portfolio</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateAsset",
  data: function () {
    return {
      nameOfAsset: '',
      typeOfAsset: '',
      initialValue: 0,
      currentValue: 0,
      gain: 0

    }
  },
  methods: {
    submit(){
      let asset = {nameOfAsset: this.nameOfAsset, typeOfAsset: this.typeOfAsset,
        initialValue: this.initialValue, currentValue: this.currentValue, gain: this.gain}
      axios.post('http://localhost:5050/assets',asset)
          .catch(err => console.log(err.message));

      this.nameOfAsset= '';
      this.typeOfAsset= '';
      this.initialValue = 0;
      this.currentValue= 0;
      this.gain= 0;
    }
  }
}
</script>

<style scoped>

</style>