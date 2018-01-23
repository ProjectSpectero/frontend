<template>
  <div class="container container-600">
    <div class="pad">
      <h2>Listeners</h2>
      <div class="list-add-item">
        <input type="text" class="input" placeholder="Enter new listener">
        <button class="button button-success right">Add Listener</button>
      </div>
      <ul>
        <li class="list-item">
          <span class="title"><strong>0.0.0.0</strong>:8800</span>
          <div class="listener-actions">
            <button class="button button-sm">Remove</button>
          </div>
        </li>
        <li class="list-item">
          <span class="title"><strong>0.0.0.0</strong>:8800</span>
          <div class="listener-actions">
            <button class="button button-sm">Remove</button>
          </div>
        </li>
        <li class="list-item">
          <span class="title"><strong>0.0.0.0</strong>:8800</span>
          <div class="listener-actions">
            <button class="button button-sm">Remove</button>
          </div>
        </li>
        <li class="list-item">
          <span class="title"><strong>0.0.0.0</strong>:8800</span>
          <div class="listener-actions">
            <button class="button button-sm">Remove</button>
          </div>
        </li>
        <li class="list-item">
          <span class="title"><strong>0.0.0.0</strong>:8800</span>
          <div class="listener-actions">
            <button class="button button-sm">Remove</button>
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
    created () {
      console.log(this.listeners)
      this.list = JSON.parse(JSON.stringify(this.listeners))
    },
    methods: {
      updateListeners () {
        this.$emit('updateListeners', this.list)
      }
    }
  }
</script>

<style>

</style>
