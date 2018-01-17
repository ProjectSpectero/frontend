<template>
  <div class="datatable">
    <add-user-modal></add-user-modal>

    <vue-good-table
    :title="title"
    :columns="columns"
    :rows="rows"
    :paginate="true"
    :globalSearch="true"
    :globalSearchPlaceholder="placeholder"
    :responsive="false"
    styleClass="spectero-table">
      <template slot="table-row" slot-scope="props">
        <td>
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
        </td>
        <td>
          {{ props.row.lastLoginDate | moment('from') }}
        </td>
        <td>
          {{ props.row.source }}
        </td>
        <td>
          {{ parseRoles(props.row.roles) }}
        </td>
      </template>

      <template slot="table-row-after" slot-scope="props">
        <td>
          <list-actions :user="props.row"></list-actions>
        </td>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import addUserModal from './addUserModal'
  import listActions from './listActions'

  export default {
    data () {
      return {
        title: 'New Users list (WIP)',
        placeholder: 'Search users ...',
        columns: []
      }
    },
    created () {
      this.fetchUsers({ self: this })
      this.columns = [
        {
          label: 'User details',
          field: 'fullName',
          filterable: true
        },
        {
          label: 'Last active',
          field: 'lastLoginDate',
          filterable: true
        },
        {
          label: 'Source',
          field: 'source',
          filterable: true
        },
        {
          label: 'Roles',
          field: 'roles'
        },
      ]
    },
    computed: {
      ...mapGetters({
        rows: 'users/list'
      })
    },
    methods: {
      ...mapActions({
        fetchUsers: 'users/fetch'
      }),
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
      addUserModal,
      listActions
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
</style>
