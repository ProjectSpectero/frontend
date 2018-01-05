// Default routes: error pages, catch-all ...

import NotFound from '@/components/NotFound'

export default [
  { path: '*', name: 'notFound', component: NotFound }
]
