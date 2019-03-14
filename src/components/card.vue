<template>
  <div @click="test">
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    test (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.card {
  padding: 10px;
  background-color: #f60;
}
</style>
