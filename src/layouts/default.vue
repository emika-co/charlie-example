<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  created () {
    // eslint-disable-next-line
    console.log("Test")
    // eslint-disable-next-line
    console.log(process.env)
  }
}
</script>
