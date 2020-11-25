<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  async mounted () {
    await this.$store.dispatch('onAuth')
  }
}
</script>
