<template>
  <div class="node" v-on:click="openNodeDetails">
    <h3>{{ node.title }}</h3>
    <span class="ip">{{ node.ip }}</span>
    <span class="status" v-bind:class="statusClass">{{ node.status }}</span>
  </div>
</template>

<script>
export default {
  props: ['node'],
  data () {
    return {}
  },
  computed: {
    statusClass: function () {
      return {
        online: this.node.status === 'online',
        offline: this.node.status !== 'online'
      }
    }
  },
  methods: {
    openNodeDetails: function () {
      this.$router.push('node/' + this.node.id)
    }
  }
}
</script>

<style scoped>
.node {
  width: 100%;
  max-width: 350px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 14px;
  background: rgba(0,0,0,.2);
  color: #fff;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}
.node:hover {
  background: rgba(0,0,0,.3);
}
h3 {
  margin-bottom: 0;
  line-height: 120%;
}
.ip {
  font-size: 85%;
  line-height: 100%;
  opacity: 0.7;
}
.status {
  font-weight: bold;
  text-transform: capitalize;
  position: absolute;
  bottom: 14px;
  right: 14px;
  font-size: 85%;
  line-height: 100%;
}
.status.offline {
  color: #FF5964;
}
.status.online {
  color: #18FF6D;
}
</style>
