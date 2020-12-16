<template>
  <div>
    history
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  layout: 'app',
  created () {
    this.$store.dispatch('setCurrentPage', '/users/history')
  }
}
</script>
