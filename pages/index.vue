<template>
  <div class="container d-flex">
    <div class="row justify-content-center align-middle">
      <Logo />
      <h1 class="title">
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
  components: { FacebookLogin, GoogleLogin },
  async beforeMount () {
    await this.$store.dispatch('user/onAuth')
  }
}
</script>
