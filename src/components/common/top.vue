<template>
  <div class="top p-3">
    <img src="~@/assets/img/logo.svg">
    <ul>
      <li>
        <a href="/logout" @click.prevent="logout">Logout</a>
      </li>
    </ul>
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
  .top {
    display: flex;
    align-items: center;

    > img {
      height: 25px;
    }

    > ul {
      margin-left: auto;
    }
  }
</style>
