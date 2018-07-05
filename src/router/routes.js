
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      requireAuth: true,
    },
    children: [
      { name:'Home', path: '', component: () => import('pages/index') },
      // ADMINISTRATIONS ROUTE
      { name:'Admin', path: '/company', component: () => import('pages/administration/company'), meta:{type:'main', parent:'ADM00', code:'ADM00'} },
      { name:'Company', path: '/company', component: () => import('pages/administration/company'), meta:{type:'sub', parent:'ADM00', code:'ADM00', icon:'fa fa-building'} },
      { name:'Users', path: '/users', component: () => import('pages/administration/users'), meta:{type:'sub', parent:'ADM00', code:'ADM01', icon:'fa fa-users'} },
      { name:'Roles', path: '/roles', component: () => import('pages/administration/roles'), meta:{type:'sub', parent:'ADM00', code:'ADM02', icon:'fa fa-lock'} },
      { name:'Roles Pages', path: '/roles_pages/:role_id', component: () => import('pages/administration/roles_pages'), meta:{type:'sub', parent:'ADM00', code:'ADM02', icon:'fa fa-lock', excluded: true} },
      // ITEMS ROUTE
      { name:'Inventory', path: '/items', component: () => import('pages/inventory/items'), meta:{type:'main', parent:'INV00', code:'INV00'} },
      { name:'Items', path: '/items', component: () => import('pages/inventory/items'), meta:{type:'sub', parent:'INV00', code:'INV01', icon:'fa fa-archive'} },
      { name:'Purchase', path: '/purchase', component: () => import('pages/inventory/purchase'), meta:{type:'sub', parent:'INV00', code:'INV02', icon:'fa fa-truck'} },
      // SALES ROUTE
      { name:'Sales', path: '/sales', component: () => import('pages/sales/transactions'), meta:{type:'main', parent:'SLE00', code:'SLE00'} },
      { name:'Tramsactions', path: '/sales', component: () => import('pages/sales/transactions'), meta:{type:'sub', parent:'SLE00', code:'SLE01', icon:'fa fa-table'} },
    ]
  },
  {
    path: '/boot',
    meta: {
      requireAuth: true,
    },
    component: () => import('layouts/boot'),
    children: [
      { path: '', name: 'boot', component: () => import('pages/boot') }
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
