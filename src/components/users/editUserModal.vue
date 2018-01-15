<template>
  <modal :name="name" :adaptive="true" height="auto" width="500px" :scrollable="true" @before-open="beforeOpen">
    <button class="modal-close" @click.prevent="closeModal"></button>
    <div class="modal-title">
      <div class="modal-title-icon"><span class="icon icon-pencil"></span></div>
      <h2>Edit user</h2>
    </div>

    <user-form action="edit" modalName="editUser" :user="user" @closeModal="closeModal"></user-form>
  </modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import userForm from './form'

  export default {
    props: {
      name: String
    },
    data () {
      return {
        user: {},
      }
    },
    methods: {
      beforeOpen (event) {
        this.user = event.params.user
      },
      closeModal () {
        this.$modal.hide(this.name)
      }
    },
    components: {
      userForm
    }
  }
</script>