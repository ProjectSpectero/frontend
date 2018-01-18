// Services routes

import Proxies from '@/components/services/proxies'
import VPN from '@/components/services/vpn'

export default [
  { path: '/proxies', name: 'proxies', component: Proxies, meta: { auth: true } },
  { path: '/vpn', name: 'vpn', component: VPN, meta: { auth: true } }
]
