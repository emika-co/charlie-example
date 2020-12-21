<template>
  <div id="background" class="container d-flex justify-content-center">
    <div class="align-self-center w-100 text-center">
      <h4 class="title">
        คุณเป็นผู้ขายแล้ว
      </h4>
      <p class="mx-5">
        คุณสามารถลงขายสินค้าของคุณได้ทันที โดยการกดปุ่มด้านล่าง
      </p>
      <div class="col-8 mx-auto mt-4">
        <nuxt-link to="/sellers/dashboard" class="btn btn-primary w-100">
          เริ่มขายสินค้าเลย
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'seller']
}
</script>

<style scoped>
  .container {
    height: 100vh;
  }
  #background {
    background-image: url('~assets/background.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
  .title {
    margin-top: 380px;
  }
</style>
