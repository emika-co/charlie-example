<template>
  <div id="wrapper" class="d-flex">
    <Loading />
    <UserSidebar />
    <div id="page-content-wrapper">
      <UserNavbar />
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
