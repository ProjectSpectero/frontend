<template>
  <div class="title-bar">
    <h1>{{ title }}</h1>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { getCookie, removeCookie } from 'tiny-cookie'

  export default {
    props: {
      title: String
    },
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
    padding: 14px $pad;
    background: $white;
    border-bottom: 1px solid $color-border;
  }
</style>
