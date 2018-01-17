// Default routes: error pages, catch-all ...

import notFound from '@/components/notFound'
import ui from '@/components/ui'

export default [
  { path: '*', name: 'notFound', component: notFound },
  { path: '/ui', name: 'ui', component: ui },
]
