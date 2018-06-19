
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      requireAuth: true,
    },
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/boot',
    component: () => import('layouts/boot'),
    meta: {
      requireAuth: true,
    },
    children: [
      { path: '', component: () => import('pages/boot') }
    ]
  },
  {
    path: '/items',
    component: () => import('layouts/default'),
    meta: {
      requireAuth: true,
      page: 'INV00',
      code: 'INV00',
    },
    children: [
      { path: '', component: () => import('pages/inventory/items') }
    ]
  },
  {
    path: '/purchase',
    component: () => import('layouts/default'),
    meta: {
      requireAuth: true,
      page: 'INV00',
      code: 'INV01',
    },
    children: [
      { path: '', component: () => import('pages/inventory/purchase') }
    ]
  },
  {
    path: '/sales',
    component: () => import('layouts/default'),
    meta: {
      requireAuth: true,
      page: 'SLE00',
      code: 'SLE00',
    },
    children: [
      { path: '', component: () => import('pages/sales/transactions') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/login'),
    children: [
      { path: '', name: 'login', component: () => import('pages/login') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
