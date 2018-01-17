<template>
  <div class="sidebar">
    <div class="logo">
      <img src="~@/assets/img/logo.svg">
    </div>
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
            <li><a href="#">Services</a></li>
            <li><a href="#">Users</a></li>
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
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';
  
  .sidebar {
    width: 230px;
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
  }
  .logo {
    padding: $pad;
    
    img {
      width: 138px;
      height: 20px;
      display: block;
    }
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
