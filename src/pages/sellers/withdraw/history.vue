<template>
  <div class="container d-flex justify-content-center">
    <div class="align-self w-100">
      <div class="row pt-3">
        <div class="col-12">
          <span class="text-muted">
            รายการถอนเงินย้อนหลัง
          </span>
        </div>
      </div>
      <div class="row bg-white p-3">
        <history-withdraw-item />
        <history-withdraw-item :status="'S'" />
        <history-withdraw-item :status="'S'" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'view',
  created () {
    this.$store.dispatch('loading', true)
    this.$store.dispatch('setPageTitle', 'ประวัติการถอนเงิน')
    this.$store.dispatch('loading', false)
  }
}
</script>

<style scoped>
</style>
