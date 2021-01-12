<template>
  <div id="payment-method" class="rounded p-3 w-100" :class="{ 'active': active }">
    {{ name }}
    <div class="float-right">
      <img :src="imgCover">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      default: '',
      type: String
    },
    imgCover: {
      default: '',
      type: String
    },
    active: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped>
#payment-method {
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.active {
  border: 1px solid #539AEE !important;
}
img {
  margin-top: -3px;
}
</style>
