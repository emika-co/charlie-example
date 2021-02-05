<template>
  <div class="container d-flex justify-content-center bg">
    <div class="align-self-center w-100 text-center">
      <div class="title">
        <h4 class="mb-3">
          Filolo
        </h4>
        <p>สมัครสมาชิก หรือเข้าสู่ระบบ</p>
      </div>
      <div class="spacer" />
      <facebook-login class="mb-3" />
      <google-login />
      <div class="fixed-bottom">
        <p class="mb-4">
          <nuxt-link to="/" class="link">
            Privacy Policy
          </nuxt-link>
          and
          <nuxt-link to="/" class="link">
            Terms of Service
          </nuxt-link>
        </p>
      </div>
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
    margin-bottom: 9rem;
  }
  .title {
    margin-top: -13.5rem;
  }
  .link {
    color: white;
    text-decoration: underline;
  }
</style>
