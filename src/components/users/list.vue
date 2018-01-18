<template>
  <div>
    <top title="Users">
      <router-link :to="{ name: 'usersCreate' }" class="button button-success">
        Add New User
      </router-link>
    </top>

    <div class="datatable">
      <add-user-modal></add-user-modal>

      <div v-if="selectedUser">
        <remove :name="modalName('delete')"></remove>
        <edit :name="modalName('edit')"></edit>
        <certificates :name="modalName('certificates')"></certificates>
      </div>

      <v-client-table :data="tableData" :columns="columns" :options="options">
        <template slot="name" slot-scope="props">
          <div class="mainInfo">
            <div class="avatar">
              {{ parseInitials(props.row) }}
            </div>
            <div class="name">
              <div>
                <h5>{{ props.row.fullName || props.row.authKey }}</h5>
              </div>

              <h6 v-if="props.row.fullName">{{ props.row.authKey }}</h6>
            </div>
          </div>
        </template>

        <template slot="lastLoginDate" slot-scope="props">
          {{ props.row.lastLoginDate | moment('from') }}
        </template>

        <template slot="roles" slot-scope="props">
          {{ parseRoles(props.row.roles) }}
        </template>

        <template slot="actions" slot-scope="props">
          <button class="button button-dark" v-for="(actionButton, index) in actionButtons" :key="index" @click="triggerActionModal(props.row, actionButton.key)">
            <span :class="['icon', actionButton.icon]"></span>
          </button>
        </template>
      </v-client-table>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import Top from '../common/top'
  import edit from './editModal'
  import remove from './deleteModal'
  import certificates from './certificatesModal'

  export default {
    data () {
      return {
        selectedUser: null,
        actionButtons: [],
        columns: [],
        options: {}
      }
    },
    created () {
      this.fetchUsers({ self: this })
      this.actionButtons = [
        { key: 'edit', icon: 'icon-edit' },
        { key: 'delete', icon: 'icon-trash' },
        { key: 'certificates', icon: 'icon-award' }
      ],
      this.columns = ['name', 'lastLoginDate', 'source', 'roles', 'actions']
      this.options = {
        skin: '',
        headings: {
          name: 'Name',
          lastLoginDate: 'Last login',
          source: 'Source',
          roles: 'Roles',
          actions: 'Actions'
        },
        sortable: ['lastLoginDate', 'source', 'roles'],
        filterable: ['fullName'],
        customFilters: [],
        texts: {
          count:"Showing {from} to {to} of {count} records|{count} records|One record",
          filter: '',
          filterPlaceholder: 'Search users ...',
          limit: 'Records:',
          page: 'Page:',
          noResults: 'No matching records',
          filterBy: "Filter by {column}",
          loading: 'Loading...',
          defaultOption: 'Select {column}',
          columns: 'Columns'
        },
        perPage: 3
      }
    },
    computed: {
      ...mapGetters({
        tableData: 'users/list'
      })
    },
    methods: {
      ...mapActions({
        fetchUsers: 'users/fetch'
      }),
      triggerActionModal (user, action) {
        this.selectedUser = user
        Vue.nextTick().then(() => {
          this.$modal.show(this.modalName(action), { user: user })
        })
      },
      modalName (modal) {
        return modal + '-' + this.selectedUser.id
      },
      parseInitials (user) {
        const displayName = user.fullName || user.authKey
        const initials = displayName.match(/\b\w/g) || []
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      },
      parseRoles (roles) {
        return roles.join(', ')
      }
    },
    components: {
      Top,
      edit,
      remove,
      certificates
    },
    metaInfo: {
      title: 'Users'
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';

  .mainInfo {
    display: flex;
    align-items: center;

    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: $font-weight-strong;
      font-size: $font-size-normal;
      text-align: center;
      background: $color-info;
      border-radius: 100%;
      margin-right: 0.75rem;
    }

    .name {
      > div {
        &::after {
          content: '';
          width: 8px;
          height: 8px;
          display: inline-block;
          margin-left: 4px;
          border-radius: 4px;
          position: relative;
          top: -2px;
          left: 2px;
          background: $color-main;
        }
      }
    }
  }

  .actions {
    width: 220px;
  }
</style>
