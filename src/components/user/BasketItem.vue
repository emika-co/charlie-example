<template>
  <div class="row bg-white mb-2">
    <div class="col-4 align-self-center py-4">
      <img :src="coverImg" class="img-fluid rounded">
    </div>
    <div class="col-8 align-self-center">
      <p class="mb-0">
        {{ name }}
      </p>
      <p class="sub-text text-muted mb-0">
        {{ storeName }}
      </p>
      <p class="mb-0">
        <b>{{ cost }}</b> บาท
      </p>
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
    coverImg: {
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
