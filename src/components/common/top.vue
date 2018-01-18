<template>
  <div class="title-bar">
    <h1>{{ title }}</h1>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';

  .title-bar {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 $pad;
    background: $white;
    border-bottom: 1px solid $color-border;
  }
</style>
