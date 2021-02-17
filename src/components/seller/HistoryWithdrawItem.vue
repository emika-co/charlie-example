<template>
  <div class="col-12">
    <div class="d-flex w-100">
      <div class="mr-auto">
        <p class="mb-1">
          12 พ.ย. 2563 - 14.31
        </p>
        <p class="text-muted">
          3,000.00 ฿
        </p>
      </div>
      <div class="ml-auto status-margin">
        <p v-if="status === 'P'" class="text-muted">
          รอโอนเงิน
        </p>
        <a v-else-if="status === 'S'" :href="downloadLink">
          ดาวน์โหลดเอกสาร
        </a>
      </div>
    </div>
    <div class="w-100">
      <hr class="mt-0">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      default: 'P',
      type: String
    },
    downloadLink: {
      default: '#',
      type: String
    }
  }
}
</script>

<style scoped>
.status-margin {
  margin-top: 0.75rem;
}
</style>
