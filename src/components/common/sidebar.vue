<template>
  <div class="sidebar">
    <div class="logo logo-sm"></div>
    <section class="nav-section">
      <ul>
        <li><a href="#"><span class="icon-zap"></span> Overview</a></li>
      </ul>
    </section>
    <section class="nav-section">
      <h5>Servers</h5>
      <ul>
        <li class="active">
          <a href="#"><span class="icon-sliders"></span> Manage Server</a>
          <ul>
            <li><a href="#">Overview</a></li>

            <router-link tag="li" :to="{ name: 'vpn' }">
              <a>VPN Server</a>
            </router-link>

            <router-link tag="li" :to="{ name: 'proxies' }">
              <a>Proxies</a>
            </router-link>

            <router-link tag="li" :to="{ name: 'users' }">
              <a>Users</a>
            </router-link>

            <li><a href="#">Statistics</a></li>
          </ul>
        </li>
        <li><a href="#"><span class="icon-layers"></span> Mass Manage</a></li>
      </ul>
    </section>
    <section class="nav-section">
      <h5>Marketplace</h5>
      <ul>
        <li><a href="#"><span class="icon-share-2"></span> Spectero Market</a></li>
        <li><a href="#"><span class="icon-globe"></span> Proxy Network</a></li>
      </ul>
    </section>
    <section class="nav-section">
      <h5>Help</h5>
      <ul>
        <li><a href="#"><span class="icon-life-buoy"></span> Documentation</a></li>
      </ul>
    </section>
    <section class="nav-section">
      <h5>Logout</h5>
      <ul>
        <li @click="logout">
          <a href="#"><span class="icon-life-buoy"></span> Logout</a>
        </li>
      </ul>
    </section>
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

  .sidebar {
    width: 230px;
    min-width: 230px;
    background: #161A1F;
    color: $white;
  }
  a {
    padding: 13px $pad;
    display: block;
    color: $color-light;
    font-size: 15px;
    font-weight: $font-weight-semi;

    &:hover {
      color: $white;
    }
  }
  h5 {
    padding-left: $pad;
    padding-bottom: 8px;
    margin-bottom: 0;
  }
  .logo {
    margin: $pad;
  }
  .nav-section {
    margin-bottom: 16px;
  }
  [class^="icon-"], [class*=" icon-"] {
    margin-right: 4px;
  }
  .active {
    box-shadow: inset 3px 0 0 $color-brand;
    background: rgba(0,0,0,0.3);

    > a {
      color: $white;
    }
  }
</style>
