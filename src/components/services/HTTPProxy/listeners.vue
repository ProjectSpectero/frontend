<template>
  <div class="container container-600">
    <div class="pad">
      <h2>Listeners</h2>
      <div class="list-add-item">
        <input v-model="ip" type="text" class="input" placeholder="IP address">
        <input v-model="port" type="number" class="input" placeholder="Port">

        <button @click="addListener" class="button button-success right">Add Listener</button>
      </div>

      <ul>
        <li v-for="(listener, index) in list" :key="index" class="list-item">
          <span class="title">
            <strong>{{ listener.item1 }}</strong>:{{ listener.item2 }}
          </span>
          <div class="listener-actions">
            <button @click="removeListener(index)" class="button button-sm">
              Remove
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      listeners: Array
    },
    data () {
      return {
        list: [],
        ip: null,
        port: null
      }
    },
    created () {
      this.list = JSON.parse(JSON.stringify(this.listeners))
    },
    methods: {
      removeListener (index) {
        this.list.splice(index, 1)
        this.update()
      },
      addListener () {
        if (this.ip && this.port) {
          this.list.push({
            item1: this.ip,
            item2: this.port
          })

          this.reset()
          this.update()
        }
      },
      update () {
        this.$emit('update', this.list)
      },
      reset () {
        this.ip = null
        this.port = null
      }
    }
  }
</script>
