<template>
  <div id="sidebar-wrapper" class="bg-white border-right">
    <div class="sidebar-heading">
      <img src="~/assets/logo.svg" alt="logo">
    </div>
    <div class="text-center">
      <nuxt-link to="/sellers/dashboard" class="btn btn-primary py-2 px-5 mx-auto">
        แดชบอร์ดผู้ขาย
      </nuxt-link>
    </div>
    <hr>
    <div class="list-group list-group-flush">
      <nuxt-link to="/users/history" class="list-item">
        กลับไปหน้าผู้ซื้อ
      </nuxt-link>
      <div class="app-link list-item" @click="signOut()">
        ออกจากระบบ
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('user/signOut')
    }
  }
}
</script>

<style scoped>
  img {
    width: 144px;
  }
</style>
