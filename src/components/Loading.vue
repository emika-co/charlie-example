<template>
  <div class="loading" :class="{ 'd-none': !isLoading }">
    <div class="text-white content">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    }
  }
}
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.7);
  z-index: 1000;
}
.content {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
