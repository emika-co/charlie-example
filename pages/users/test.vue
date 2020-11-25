<template>
  <div>
    AUTH TEST
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  mounted () {
    // eslint-disable-next-line no-console
    console.log(this.$store.getters.getUser)
  }
}
</script>
