
export default [
  //SHOULD ALWAYS BE ON TOP/FIRST
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      requireAuth: true,
    },
    children: [
      { name:'home', path: '', component: () => import('pages/index') },
      // ADMINISTRATIONS ROUTE
      { name:'admin', path: '/company', component: () => import('pages/administration/company'), meta:{type:'main', parent:'ADM00', code:'ADM00', title:'Company', icon:'fa fa-building'} },
      { name:'company', path: '/company', component: () => import('pages/administration/company'), meta:{type:'sub', parent:'ADM00', code:'ADM01', title:'Company', icon:'fa fa-building'} },
      { name:'users', path: '/users', component: () => import('pages/administration/users'), meta:{type:'sub', parent:'ADM00', code:'ADM02', title:'Users', icon:'fa fa-users'} },
      { name:'roles', path: '/roles', component: () => import('pages/administration/roles'), meta:{type:'sub', parent:'ADM00', code:'ADM03', title:'Roles', icon:'fa fa-lock'} },
      { name:'roles_pages', path: '/roles_pages/:role_id', component: () => import('pages/administration/roles_pages'), meta:{type:'sub', parent:'ADM00', code:'ADM04', title:'Roles Pages', icon:'fa fa-lock', excluded: true} },
      // ITEMS ROUTE
      { name:'inventory', path: '/items', component: () => import('pages/inventory/items'), meta:{type:'main', parent:'INV00', title:'Items', icon:'fa fa-archive', code:'INV00'} },
      { name:'items', path: '/items', component: () => import('pages/inventory/items'), meta:{type:'sub', parent:'INV00', code:'INV01', title:'Items', icon:'fa fa-archive'} },
      { name:'purchases', path: '/purchase', component: () => import('pages/inventory/purchase'), meta:{type:'sub', parent:'INV00', title:'Purchase', code:'INV02', icon:'fa fa-truck'} },
      // SALES ROUTE
      { name:'sales', path: '/sales', component: () => import('pages/sales/transactions'), meta:{type:'main', parent:'SLE00',  title:'Transactions', icon:'fa fa-table', code:'SLE00'} },
      { name:'sales_trans', path: '/sales', component: () => import('pages/sales/transactions'), meta:{type:'sub', parent:'SLE00', code:'SLE01', title:'Transactions', icon:'fa fa-table'} },
    ]
  },
  //========================================================================
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
