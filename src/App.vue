<template>
  <div id="app">

    <h1>{{ title }}</h1>
    <p>Welcome..</p>

    <div v-if="showModal">
    <Modal theme = "sale" @close="toggleModal">
      <h1> Grab your Savings</h1>
      <p>Save 10%</p>
      <template v-slot:links>
        <a ref="#">Sign up</a>
        <a ref="#">More Information</a>
      </template>
    </Modal>
    </div>

    <button @click="toggleModal">Sign up</button>
    <div v-if="showPortfolio">
      <Portfolio/>
      <button @click="togglePortfolio">Close Portfolio</button>
    </div>
    <button v-if="!showPortfolio" @click="togglePortfolio">Show Portfolio</button>

  </div>
</template>

<script>
import Portfolio from "@/components/Portfolio";
import Modal from './components/Modal'

export default {
  name: 'App',
  components: {
    Portfolio,
    Modal
  },
  data(){
    return {
      title: 'Portfolio Jannis Müller',
      showModal: false,
      showPortfolio: false
    }
  },
  methods: {
    toggleModal(){
      this.showModal = !this.showModal; //reverse the default value
    },
    togglePortfolio(){
      this.showPortfolio = !this.showPortfolio;
    }

  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1{
  border-bottom:  1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
