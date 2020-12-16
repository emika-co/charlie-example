<template>
  <div class="container d-flex justify-content-center">
    <Loading :is-loading="loading" />
    <div class="align-self-center w-100">
      <Logo class="d-flex justify-content-center" />
      <h1 class="title text-center">
        Project Charlie
      </h1>
      <facebook-login class="mb-3" />
      <google-login />
    </div>
  </div>
</template>

<script>
import FacebookLogin from '~/components/auth/FacebookLogin.vue'
import GoogleLogin from '~/components/auth/GoogleLogin.vue'
export default {
  name: 'Login',
  middleware: ['home'],
  components: { FacebookLogin, GoogleLogin },
  data () {
    return {
      loading: false
    }
  },
  async beforeMount () {
    this.loading = true
    await this.$store.dispatch('user/onAuth')
    this.loading = false
  }
}
</script>

<style scoped>
  .container {
    height: 100vh;
  }
</style>
