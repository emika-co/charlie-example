<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="app-link" @click="back()">
      <span class="material-icons float-left">
        arrow_back_ios
      </span>
      <span class="float-right">
        ย้อนกลับ
      </span>
    </div>
    <span class="ml-auto">
      {{ pageTitle }}
    </span>
  </nav>
</template>

<script>
export default {
  computed: {
    pageTitle () {
      return this.$store.getters.getPageTitle
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
