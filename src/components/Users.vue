<template>
  <div id="users">
		<div id="mainContainer">
      <header id="sectionHeader">
        <h1>Users</h1>
        <div class="actionButtons">
          <button>Search</button>
          <button>Filter</button>
          <button class="green">Add User</button>
        </div>
      </header>
      <section id="userList">
        <header>
          <section class="info">User Details</section>
          <section>Last Active</section>
          <section>VPN Access</section>
          <section>Proxy Access</section>
          <section>Data Received</section>
          <section>Data Sent</section>
          <section>&nbsp;</section>
        </header>
        <paginate ref="paginator" name="users" :list="users" :per="10">
          <li v-for="user in paginated('users')">
            <user-item v-bind:key="user.id" v-bind:user="user"></user-item>
          </li>
        </paginate>
      </section>
      <section id="paginateBar">
        <div class="overview">
          <span class="count" v-if="$refs.paginator">Showing <strong>{{$refs.paginator.pageItemsCount}}</strong> users</span>
          <span class="total">{{users.length}} users total</span>
        </div>
        <paginate-links for="users" :limit="2" :show-step-links="true"></paginate-links>
      </section>
		</div>
  </div>
</template>

<script>
  /* eslint-disable */ // TODO: remove
  import UserItem from './Users/UserItem'

  export default {
    name: 'users',
    metaInfo: {
      title: 'Users'
    },
    components: {
      UserItem
    },
    data: function () {
      return {
        paginate: ['users'],
        users: [
          {
            id: 1,
            name: 'Robert Clarke',
            email: 'robert@spectero.com',
            status: 'online',
            data: {
              active: 'Now',
              vpn: true,
              proxy: true,
              dataRecv: '2.4 GB',
              dataSent: '240 MB'
            }
          },
          {
            id: 2,
            name: 'Paul S.',
            email: 'paul@spectero.com',
            status: 'online',
            data: {
              active: 'Now',
              vpn: true,
              proxy: false,
              dataRecv: '54 TB',
              dataSent: '34 TB'
            }
          },
          {
            id: 3,
            name: 'Anatolie',
            email: 'anatolie@spectero.com',
            status: 'online',
            data: {
              active: 'Now',
              vpn: true,
              proxy: false,
              dataRecv: '987 MB',
              dataSent: '120 MB'
            }
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
@import '../assets/styles/_vars.scss';

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
    strong {
      color: rgba(255,255,255,1);
      font-weight: 600;
    }
  }
}
</style>
