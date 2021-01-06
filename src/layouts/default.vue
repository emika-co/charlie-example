<template>
  <div>
    <Loading />
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
    this.$store.dispatch('loading', true)
    try {
      await this.$store.dispatch('user/onAuth')
      await this.$store.dispatch('seller/initStore')
      if (this.$store.getters['user/isAuthenticated']) {
        if (this.$route.path === '/') {
          this.$store.dispatch('loading', false)
          this.$router.push(this.$store.getters['user/getAuthRedirectURL'])
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    this.$store.dispatch('loading', false)
  }
}
</script>
