<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  async beforeMount () {
    await this.$store.dispatch('user/onAuth')
  }
}
</script>
