<template>
  <div class="container d-flex justify-content-center bg">
    <div class="align-self-center w-100 text-center text-white">
      <h4>Filolo</h4>
      <p>สมัครสมาชิก หรือเข้าสู่ระบบ</p>
      <div class="spacer" />
      <facebook-login class="mb-3" />
      <google-login />
    </div>
  </div>
</template>

<script>
import FacebookLogin from '~/components/auth/FacebookLogin.vue'
import GoogleLogin from '~/components/auth/GoogleLogin.vue'
export default {
  middleware: ['home'],
  components: { FacebookLogin, GoogleLogin }
}
</script>

<style scoped>
  .container {
    height: 100vh;
  }
  .spacer {
    margin-bottom: 10rem;
  }
</style>
