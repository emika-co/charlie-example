<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler position-fixed"
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
    <div id="userNavbarToggler" class="collapse navbar-collapse" />
  </nav>
</template>
