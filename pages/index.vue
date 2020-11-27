<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        charlie
      </h1>
      <facebook-login class="mb-3" />
      <google-login />
      <button class="btn" @click="signOut()">
        SignOut
      </button>
    </div>
  </div>
</template>

<script>
import FacebookLogin from '~/components/auth/FacebookLogin.vue'
import GoogleLogin from '~/components/auth/GoogleLogin.vue'
export default {
  name: 'Login',
  components: { FacebookLogin, GoogleLogin },
  methods: {
    signOut () {
      this.$store.dispatch('user/signOut')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
