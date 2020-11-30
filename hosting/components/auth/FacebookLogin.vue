<template>
  <div>
    <button class="btn w-100 btn-login btn-facebook" @click="facebookLogin()">
      <img src="~/assets/facebook-logo.svg" class="logo-icon">
      เข้าสู่ระบบด้วย Facebook
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    async facebookLogin () {
      try {
        await this.$store.dispatch('user/signInWithFacebook')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
