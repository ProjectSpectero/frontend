<template>
  <div class="auth">
    <div class="auth-container">
      <div class="logo-container">
        <div class="logo logo-md logo-dark"></div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';

  .auth {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
  .auth-container {
    width: 350px;
    background: $white;
    color: $color-main;
    padding: $pad;
    border-radius: 4px;
    border: 1px solid $color-border;
  }
  .logo-container {
    width: 100%;
    margin-bottom: $pad;
    text-align: center;
  }
</style>
