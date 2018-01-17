<template>
  <div class="title-bar">
    <h1>Users</h1>
    <div class="title-extras">
      <a href="#" class="button button-success">Add New User</a>
    </div>
  </div>
</template>

<script>
  import { getCookie, removeCookie } from 'tiny-cookie'

  export default {
    methods: {
      logout () {
        try {
          removeCookie('SPECTERO_AUTH')
          this.$router.push({ name: 'login' })
        } catch (err) {
          throw new Error(this.$i18n.t('errors.UNABLE_TO_LOGOUT'))
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';

  .title-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px $pad;
    background: $white;
    border-bottom: 1px solid $color-border;
  }
</style>
