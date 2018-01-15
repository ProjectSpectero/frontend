<template>
  <div>
    <button @click="triggerModal(modalNames['delete'])">
      <span class="icon icon-trash"></span>
    </button>
    <button @click="triggerModal(modalNames['edit'])">
      <span class="icon icon-pencil"></span>
    </button>
    <button @click="triggerModal(modalNames['cert'])">
      <span class="icon icon-lock"></span>
    </button>

    <delete-user-modal :name="modalNames['delete']"></delete-user-modal>
    <edit-user-modal :name="modalNames['edit']"></edit-user-modal>
    <user-cert-modal :name="modalNames['cert']"></user-cert-modal>
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
    data () {
      return {
        modalNames: {
          edit: 'editUser-' + this.user.id,
          delete: 'deleteUser-' + this.user.id,
          cert: 'userCert-' + this.user.id
        }
      }
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

<style lang="scss" scoped>
  button {
    margin-right: 10px;
    padding: 12px 20px;
    border-radius: 100px;
    background: rgba(255,255,255,0.05);

    &:last-child {
      margin-right: 0;
    }
  }
</style>
