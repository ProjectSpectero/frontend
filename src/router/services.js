// Services routes

import Proxies from '@/components/services/proxies'
import ServicesList from '@/components/services/services'
import ServicesEdit from '@/components/services/edit'

export default [
  { path: '/proxies', name: 'proxies', component: Proxies, meta: { auth: true } },
  { path: '/services', name: 'services', component: ServicesList, meta: { auth: true } },
  { path: '/services/edit', name: 'serviceEdit', component: ServicesEdit, meta: { auth: true } },
]
