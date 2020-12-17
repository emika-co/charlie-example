<template>
  <div id="wrapper" class="d-flex">
    <seller-sidebar />
    <div id="page-content-wrapper">
      <nav-no-logo />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavNoLogo from '../components/seller/NavNoLogo.vue'
import SellerSidebar from '../components/seller/SellerSidebar.vue'
export default {
  name: 'Seller',
  components: { NavNoLogo, SellerSidebar }
}
</script>
