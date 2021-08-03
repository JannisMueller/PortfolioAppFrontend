<template>

  <div class="modal">
    <UpdatePensionPortfolio></UpdatePensionPortfolio>

    <button @click="closeModalPension" onclick="window.location.reload();">Close</button>
  </div>


</template>

<script>

import UpdatePensionPortfolio from "@/views/UpdatePensionPortfolio";

export default {
name: "Popup",
  components: {UpdatePensionPortfolio},
  methods: {
    closeModalPension() {
      this.$emit('clicked');
    },
  }
}
</script>

<style scoped>

.modal{
  width: 500px;
  height: 600px;

}

button{
  position: absolute;
  top: 3%;
  left: 90%;
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

button:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}

</style>