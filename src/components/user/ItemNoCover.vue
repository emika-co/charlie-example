<template>
  <div class="container">
    <div class="row mb-2">
      <div class="col">
        <span>
          {{ name }}
        </span>
        <span class="float-right">
          {{ cost }} บาท
        </span>
        <p class="sub-text text-muted mb-0">
          {{ storeName }}
        </p>
      </div>
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
    storeName: {
      default: '',
      type: String
    },
    cost: {
      default: 0,
      type: Number
    }
  }
}
</script>
