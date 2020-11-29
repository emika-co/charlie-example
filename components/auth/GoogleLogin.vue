<template>
  <div>
    <button class="btn w-100 btn-login btn-google" @click="facebookLogin()">
      <img src="~/assets/google-logo.svg" class="logo-icon">
      เข้าสู่ระบบด้วย Google
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    async facebookLogin () {
      try {
        await this.$store.dispatch('user/signInWithGoogle')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }
}
</script>
