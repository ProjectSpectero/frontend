<template>
  <div id="users">

    <new-list></new-list>

		<div id="mainContainer">
      <header id="sectionHeader">
        <h1>Users</h1>
        <div class="actionButtons">
          <button class="green" @click="addUser">Add User</button>
        </div>
      </header>

      <section id="userList">
        <header>
          <section class="info">User Details</section>
          <section>Last Active</section>
          <section>Source</section>
          <section>Roles</section>
          <section class="actions">&nbsp;</section>
        </header>
        <paginate ref="paginator" name="users" :list="users" :per="10">
          <li v-for="user in paginated('users')" v-bind:key="user.id">
            <user-item v-bind:key="user.id" v-bind:user="user"></user-item>
          </li>
        </paginate>
      </section>

      <section id="paginateBar">
        <div class="overview">
          <span class="count" v-if="$refs.paginator">
            Showing <strong>{{ $refs.paginator.pageItemsCount }}</strong> {{ usersSingularOrPlural }}
          </span>
          <span class="total">
            {{ users.length }} {{ usersSingularOrPlural }} total
          </span>
        </div>
        <paginate-links for="users" :limit="2" :show-step-links="true"></paginate-links>
      </section>
		</div>

    <list-actions></list-actions>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import userItem from './userItem'
  import newList from './newList'
  import listActions from './listActions'

  export default {
    data () {
      return {
        paginate: ['users']
      }
    },
    created () {
      this.fetchUsers({ self: this })
    },
    computed: {
      ...mapGetters({
        users: 'users/list'
      }),
      usersSingularOrPlural () {
        return  'user' + (this.users.length > 1 ? 's': '')
      }
    },
    methods: {
      ...mapActions({
        fetchUsers: 'users/fetch'
      }),
      addUser () {
        this.$modal.show('addUser')
      }
    },
    components: {
      userItem,
      newList,
      listActions
    }
  }
</script>

<style lang="scss">
@import '../../assets/styles/_vars.scss';

ul.paginate-links {
  > li {
    display: inline-block;
    margin-right: 2px;

    &:last-child {
      margin-right: 0;
    }
  }
  > li > a {
    width: 36px;
    height: 36px;
    padding: 8px 0;
    display: block;
    text-align: center;
    font-weight: 600;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    color: rgba(255,255,255,0.3);

    &:hover {
      color: rgba(255,255,255,1);
      background: rgba(255,255,255,0.05);
    }
  }
  > li.active > a {
    color: $color-main;
    border-color: $color-main;
    cursor: default;

    &:hover {
      background: none;
    }
  }
  > li.disabled > a {
    cursor: not-allowed;

    &:hover {
      color: rgba(255,255,255,0.3);
      background: none;
    }
  }
}
#sectionHeader {
  padding: 10px 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  .actionButtons button {
    margin-right: 10px;
    padding: 12px 20px;
    border-radius: 100px;

    &:last-child {
      margin-right: 0;
    }
  }
}
#userList {
  header, article {
    width: 100%;
    padding: 14px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
  header {
    padding: 12px 0;
  }
  li {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  li section, header section {
    width: 100%;
    max-width: 150px;
    font-size: 15px;
    line-height: 100%;
    padding-left: 14px;
  }
  header section {
    color: rgba(255,255,255,0.3);
    font-weight: 600;
  }
  section.info {
    max-width: none;
  }
  header section.info {
    padding-left: 0;
  }
  section.actions {
    max-width: 90px;
  }
}
#paginateBar {
  margin-top: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  color: rgba(255,255,255,0.3);

  .overview {
    font-size: 14px;
    line-height: 18px;

    .count, .total {
      display: block;
    }
    .total {
      margin-top: 4px;
    }
    strong {
      color: rgba(255,255,255,1);
      font-weight: 600;
    }
  }
}
</style>
