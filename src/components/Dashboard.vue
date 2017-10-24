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
import axios from 'axios'
import Node from './dashboard/Node.vue'

export default {
  name: 'dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  data () {
    return {
      nodes: null
    }
  },
  methods: {
    getNodes: function () {
      axios.get(`http://localhost:3000/nodes`)
      .then(response => {
        console.log(response.data)
        this.nodes = response.data.result.nodes
      })
      .catch(e => {
        console.log(`Axios error`, e)
      })
    }
  },
  created: function () {
    this.getNodes()
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
