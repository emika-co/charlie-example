<template>
  <div class="row bg-white mb-2">
    <div class="col-4 align-self-center p-2">
      <img :src="coverImg" class="img-fluid rounded">
    </div>
    <div class="col-8 align-self-center">
      <p style="margin-block-end: 0em;">
        {{ name }}
      </p>
    </div>
    <div class="col-12 pb-2">
      <hr class="mt-0 mb-2">
      <span class="float-left">
        {{ cost }} บาท
      </span>
      <span class="float-right">
        <a href="#">
          แก้ไข
        </a>
      </span>
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
    cost: {
      default: 0,
      type: Number
    },
    coverImg: {
      default: '',
      type: String
    }
  }
}
</script>
