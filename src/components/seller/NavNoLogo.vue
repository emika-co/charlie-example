<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler"
      type="button"
      @click="sidebarToggle()"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <span class="ml-auto">
      {{ pageTitle }}
    </span>
  </nav>
</template>

<script>
export default {
  computed: {
    pageTitle () {
      return this.$store.getters.getPageTitle
    }
  },
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
