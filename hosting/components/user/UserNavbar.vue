<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#userNavbarToggler"
      aria-controls="userNavbarToggler"
      aria-expanded="false"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <nuxt-link to="/" class="navbar-brand mx-auto">
      <img src="~/assets/logo.svg" alt="logo">
    </nuxt-link>
    <!-- Menus -->
    <div id="userNavbarToggler" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="#" class="nav-link" @click="signOut()">LogOut</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('user/signOut')
    }
  }
}
</script>

<style scoped>
.navbar-toggler {
  margin-right: -30px !important;
}
</style>
