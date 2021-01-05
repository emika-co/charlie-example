<template>
  <div class="row bg-white mb-2">
    <div class="col-4 align-self-center py-2">
      <img :src="coverImg" class="img-fluid rounded">
    </div>
    <div class="col-8 align-self-center">
      <p style="margin-block-end: 0em;">
        {{ name }}
      </p>
      <p class="sub-text text-muted">
        {{ storeName }}
      </p>
    </div>
    <div class="col-12 pb-2">
      <hr class="mt-0 mb-2">
      <span class="float-right">
        <a :href="downloadLink" target="_blank">
          Download
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
    storeName: {
      default: '',
      type: String
    },
    coverImg: {
      default: '',
      type: String
    },
    downloadLink: {
      default: '#',
      type: String
    }
  }
}
</script>
