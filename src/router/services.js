// Services routes

import Proxies from '@/components/services/proxies'
import Services from '@/components/services/services'

export default [
  { path: '/proxies', name: 'proxies', component: Proxies, meta: { auth: true } },
  { path: '/services', name: 'services', component: Services, meta: { auth: true } }
]
