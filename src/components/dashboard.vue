<script>
  export default {
    created() {
      // Temporary force redirect to /users
      this.$router.push({ name: 'users' })
    }
  }
</script>