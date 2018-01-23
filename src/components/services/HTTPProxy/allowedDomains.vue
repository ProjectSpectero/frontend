<template>
  <div class="container container-600">
    <div class="pad">
      <h2>Allowed Domains</h2>
      <div class="list-add-item" v-if="proxyMode === 'ExclusiveAllow'">
        <input type="text" class="input" placeholder="Enter new domain">
        <button class="button button-success right">Add Domain</button>
      </div>
      <div v-else class="cannot-edit-message">
        Proxy Mode must be set to <strong>ExclusiveAllow</strong> to edit allowed domains.
      </div>
      <ul>
        <li class="list-item">
          <span class="title"><strong>google.com</strong></span>
          <div class="listener-actions">
            <button class="button button-sm" :disabled="proxyMode !== 'ExclusiveAllow'">Remove</button>
          </div>
        </li>
        <li class="list-item">
          <span class="title"><strong>spectero.com</strong></span>
          <div class="listener-actions">
            <button class="button button-sm" :disabled="proxyMode !== 'ExclusiveAllow'">Remove</button>
          </div>
        </li>
        <li class="list-item">
          <span class="title"><strong>stackoverflow.com</strong></span>
          <div class="listener-actions">
            <button class="button button-sm" :disabled="proxyMode !== 'ExclusiveAllow'">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      proxyMode: String
    }
  }
</script>

<style>

</style>
