// Default routes: error pages, catch-all ...

import notFound from '@/components/notFound'

export default [
  { path: '*', name: 'notFound', component: notFound }
]
