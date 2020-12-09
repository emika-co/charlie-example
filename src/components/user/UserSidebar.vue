<template>
  <div id="sidebar-wrapper" class="bg-light border-right">
    <div class="sidebar-heading">
      <img src="~/assets/logo.svg" alt="logo">
    </div>
    <div v-if="!store" class="text-center">
      <a href="/sellers/stores" class="btn btn-primary py-2 px-5 mx-auto">
        สมัครเป็นผู้ขาย
      </a>
    </div>
    <hr>
    <div class="list-group list-group-flush">
      <a href="#" class="list-item">ดาวน์โหลด</a>
      <a href="#" class="list-item" @click="signOut()">ออกจากระบบ</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    store () {
      if (this.$store.state.seller.store.id) {
        return true
      }
      return false
    }
  },
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
