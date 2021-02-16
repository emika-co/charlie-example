<template>
  <div>
    <div>
      <div class="container d-flex justify-content-center vh100">
        <div class="align-self-center w-100 text-center">
          <div class="title">
            <h4 class="mb-3">
              Filolo
            </h4>
            <p>สมัครสมาชิก หรือเข้าสู่ระบบ</p>
          </div>
          <div class="spacer" />
          <!-- <facebook-login class="mb-3" /> -->
          <google-login />
          <div>
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
    </div>
    <div>
      <img class="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/charlie-296709.appspot.com/o/resources%2Fbg%2Fbg-desktop.jpg?alt=media&token=109775e7-fab6-4475-93bc-38b23265d021">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.vh100 {
  height: 100vh;
}
</style>
