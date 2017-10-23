<template>
  <div id="app">
    <header id="app-header">
      <span class="logo-main">Spectero</span>
    </header>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Spectero',
    titleTemplate: 'Spectero | %s'
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
h1 {
  margin-bottom: 18px;
  font-size: 200%;
}
h2 {
  margin-bottom: 14px;
  font-size: 150%;
}
h3 {
  margin-bottom: 8px;
  font-size: 125%;
}
p {
  margin-bottom: 14px;
}
p:last-child {
  margin-bottom: 0;
}
#app {
  font: 16px/24px 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
.wrapper {
  padding: 20px;
}
#app-header {
  width: 100%;
  padding: 20px;
  background: #2c3e50;
}
.logo-main {
  width: 168px;
  height: 25px;
  display: block;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  background: url(./assets/img/logo.svg) 0 0/100% 100%;
}
.clearfix:after {
  clear: both;
  content: '';
  display: table;
}
</style>
