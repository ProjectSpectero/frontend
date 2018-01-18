<template>
  <modal name="addUser" :adaptive="true" height="auto" width="500px" :scrollable="true">
    <button class="modal-close" @click.prevent="closeModal"></button>
    <div class="modal-title">
      <div class="modal-title-icon green">
        <span class="icon icon-users"></span>
      </div>
      <h2>Add new user</h2>
    </div>

    <user-form action="create" @closeModal="closeModal"></user-form>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import userForm from './form'

  export default {
    methods: {
      closeModal () {
        this.$modal.hide('addUser')
      }
    },
    components: {
      userForm
    }
  }
</script>