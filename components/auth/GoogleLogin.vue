<template>
  <div>
    <button class="btn btn-primary" @click="facebookLogin()">
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
