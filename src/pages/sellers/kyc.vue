<template>
  <div>
    <div class="row">
      <label>รายละเอียดบัญชี</label>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'view',
  // middleware: ['auth'],
  created () {
    this.$store.dispatch('setPageTitle', 'สมัครเป็นผู้ขาย')
  }
}
</script>
