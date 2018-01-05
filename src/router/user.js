// User routes

import Dashboard from '@/components/Dashboard'
import Users from '@/components/Users'

export default [
  { path: '/', name: 'dashboard', component: Dashboard, meta: { auth: true } },
  { path: '/users', name: 'users', component: Users, meta: { auth: true } }
]
