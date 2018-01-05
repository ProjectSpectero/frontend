// Auth routes

import Login from '@/components/Login'

export default [
  { path: '/login', name: 'login', component: Login, meta: { antiAuth: true } }
]
