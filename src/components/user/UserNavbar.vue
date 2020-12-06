<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler"
      type="button"
      @click="sidebarToggle()"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <nuxt-link to="/" class="navbar-brand mx-auto">
      <img src="~/assets/logo.svg" alt="logo">
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  methods: {
    sidebarToggle () {
      document.getElementById('wrapper').classList.toggle('toggled')
    }
  }
}
</script>

<style scoped>
.navbar-toggler {
  margin-right: -30px !important;
}
</style>
