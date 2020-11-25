<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        charlie
      </h1>
      <facebook-login />
      <button class="btn" @click="signOut()">
        SignOut
      </button>
    </div>
  </div>
</template>

<script>
import FacebookLogin from '~/components/FacebookLogin.vue'
export default {
  components: { FacebookLogin },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
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
