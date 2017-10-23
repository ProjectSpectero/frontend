<template>
  <div id="dashboard">
    <h1 class="main-title">Dashboard</h1>
    <section id="nodes">
      <h2>Nodes</h2>
      <p>This is a general overview of all your server nodes. Click on any node to see more details.</p>
      <div class="clearfix">
        <Node v-for="node in nodes" v-bind:node="node" v-bind:key="node.id" />
      </div>
    </section>
  </div>
</template>

<script>
import Node from './dashboard/Node.vue'

export default {
  name: 'dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  data () {
    return {
      nodes: [
        {
          id: 1,
          title: 'dxbpi1',
          ip: '94.202.105.172',
          status: 'offline'
        },
        {
          id: 2,
          title: 'seapi1',
          ip: '50.47.111.48',
          status: 'online'
        },
        {
          id: 3,
          title: 'seapi2',
          ip: '67.170.105.255',
          status: 'online'
        },
        {
          id: 4,
          title: 'seapi3',
          ip: '67.170.105.255',
          status: 'online'
        }
      ]
    }
  },
  components: {
    Node
  }
}
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #2c3e50;
  color: #fff;
  border-radius: 4px;
}
.main-title {
  margin: 10px 0 30px 0;
}
</style>
