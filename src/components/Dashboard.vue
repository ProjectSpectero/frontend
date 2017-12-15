<template>
  
</template>

<script>
  export default {
    name: 'dashboard',
    created() {
      // Temporary force redirect to /users
      this.$router.push({ name: 'users' })
    }
  }
</script>

<style lang="scss" scoped>

</style>