// User routes

import Dashboard from '@/components/dashboard'
import UsersList from '@/components/users/list'
import UsersCreate from '@/components/users/create'

export default [
  { path: '/', name: 'dashboard', component: Dashboard, meta: { auth: true } },
  { path: '/users', name: 'users', component: UsersList, meta: { auth: true } },
  { path: '/users/add', name: 'usersCreate', component: UsersCreate, meta: { auth: true } },
]
