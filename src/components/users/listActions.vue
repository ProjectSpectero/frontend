<template>
  <div class="actions">
    <button @click="triggerModal('deleteUser')">
      <span class="icon icon-trash"></span>
    </button>
    <button @click="triggerModal('editUser')">
      <span class="icon icon-pencil"></span>
    </button>
    <button @click="triggerModal('userCert')">
      <span class="icon icon-lock"></span>
    </button>

    <edit-user-modal></edit-user-modal>
    <delete-user-modal></delete-user-modal>
    <user-cert-modal></user-cert-modal>
  </div>
</template>

<script>
  import editUserModal from './editUserModal'
  import deleteUserModal from './deleteUserModal'
  import userCertModal from './userCertModal'

  export default {
    props: {
      user: Object
    },
    methods: {
      triggerModal (action) {
        this.$modal.show(action, { user: this.user })
      }
    },
    components: {
      editUserModal,
      deleteUserModal,
      userCertModal
    }
  }
</script>
