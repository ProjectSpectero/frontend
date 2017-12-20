<template>
  <article :class="user.status">
    <section class="info">
      <div class="avatar">{{ initials }}</div>
      <div class="text">
        <h2>{{ displayName }}</h2>
        <span class="email" v-if="user.emailAddress">{{ user.emailAddress }}</span>
      </div>
    </section>
    <section class="active">{{ new Date(user.lastLoginDate) }}</section>
    <section class="source">{{ user.source }}</section>
    <section class="actions">
      <button @click="deleteUser()">Delete</button>
      <button>Edit</button>
      <button>Info</button>
    </section>
  </article>
</template>

<script>
  export default {
    name: 'user-item',
    props: ['user'],
    data: function () {
      return {}
    },
    computed: {
      displayName () {
        return this.user.fullName ? this.user.fullName : this.user.authKey
      },
      initials () {
        let name = this.displayName
        let initials = name.match(/\b\w/g) || []
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
        return initials
      }
    },
    methods: {
      deleteUser () {
        this.$modal.show('deleteUser', { user: this.user })
      }
    }
  }
</script>

<style lang="scss" scoped>
article {
  background: rgba(0,0,0,0.2);
  border-radius: 4px;
  
  .info {
    display: flex;
    align-items: center;

    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      float: left;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      background: #3855F2;
      border-radius: 100%;
    }
    .text {
      margin-left: 14px;
    }
    h2 {
      display: block;
      font-size: 16px;
      line-height: 100%;
      padding-right: 2px;

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
      }
    }
    span.email {
      margin-top: 6px;
      display: block;
      font-size: 14px;
      line-height: 100%;
      color: rgba(255,255,255,0.3);
    }
  }
  &.online {
    .info h2::after {
      background: #18FF6D;
    }
  }
  &.offline {
    .info h2::after {
      background: #FF5964;
    }
  }
}
</style>
