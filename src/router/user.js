// User routes

import Dashboard from '@/components/dashboard'
import Users from '@/components/users/list'

export default [
  { path: '/', name: 'dashboard', component: Dashboard, meta: { auth: true } },
  { path: '/users', name: 'users', component: Users, meta: { auth: true } }
]
