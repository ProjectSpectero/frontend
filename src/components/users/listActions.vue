<template>
  <div class="actions">
    <add-user-modal></add-user-modal>
    <edit-user-modal></edit-user-modal>
    <delete-user-modal></delete-user-modal>
    <user-cert-modal></user-cert-modal>
  </div>
</template>

<script>
  import addUserModal from './addUserModal'
  import editUserModal from './editUserModal'
  import deleteUserModal from './deleteUserModal'
  import userCertModal from './userCertModal'

  export default {
    components: {
      addUserModal,
      editUserModal,
      deleteUserModal,
      userCertModal
    }
  }
</script>

<style>

</style>
