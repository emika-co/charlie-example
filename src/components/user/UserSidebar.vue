<template>
  <div id="sidebar-wrapper" class="bg-white border-right">
    <div class="sidebar-heading">
      <img src="~/assets/logo.svg" alt="logo">
    </div>
    <div class="text-center">
      <button class="btn btn-primary py-2 px-5 mx-auto" @click="goTo('/sellers/kyc')">
        <span v-if="store">
          หน้าจัดการขาย
        </span>
        <span v-else>
          สมัครเป็นผู้ขาย
        </span>
      </button>
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
    },
    goTo (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
  img {
    width: 144px;
  }
</style>
