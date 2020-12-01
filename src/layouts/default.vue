<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  created () {
    // eslint-disable-next-line
    console.log(process.env.API_KEY)
    // eslint-disable-next-line
    console.log(process.env.firebaseConfig)
  }
}
</script>
