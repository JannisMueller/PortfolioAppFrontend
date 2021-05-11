<template>
  <div>
<div class="backdrop" @click.self="closeModal"> <!-- funkar bara om kan click på backdrop området-->
  <CreateAsset/>

  </div>
</div>
</template>

<script>

export default {
  components: {},
  props:['theme'],
  methods: {
    closeModal(){
      this.$emit('close')
    }
  }
}

</script>

<style>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;

}

.backdrop{
  top:0;
  position: fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
}
.modal h1 {
  color: white;
}

.modal .actions {
  text-align: center;
  margin: 30px 0 10px 0;
  color: #9f593f;
}

</style>