<template>
  <div>
    <UserNavbar />
  </div>
</template>

<script>
export default {
  middleware: ['auth']
}
</script>
