<template>
  <modal name="addUser" :adaptive="true" height="auto" width="500px" :scrollable="true" :clickToClose="false">
    <button class="modal-close" @click.prevent="hide"></button>
    <div class="modal-title">
      <div class="modal-title-icon green">
        <span class="icon icon-users"></span>
      </div>
      <h2>Add new user</h2>
    </div>

    <user-form action="create" modalName="addUser" @closeModal="closeModal"></user-form>
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