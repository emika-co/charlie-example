<template>
  <div>
    <Loading :is-loading="loading" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
      loading: false
    }
  },
  async beforeMount () {
    this.loading = true
    await this.$store.dispatch('user/onAuth')
    await this.$store.dispatch('seller/initStore')
    this.loading = false
    if (this.$store.getters['user/isAuthenticated']) {
      if (this.$route.path === '/') {
        this.$router.push(this.$store.getters['user/getAuthRedirectURL'])
      }
    }
  }
}
</script>
