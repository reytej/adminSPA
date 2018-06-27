export const setConfigs = (state, data) => {
	// { path: '', component: () => import('pages/index') };
	// { path: 'company', component: () => import('pages/administration/company'), meta:{parent:'ADM00', code:'ADM00'} }
	// let routes = [];
	// routes.push({ path: '', component: () => import('pages/index') });
	// if(data){
	// 	for(let key in data.links){
	// 		if(data.links.hasOwnProperty(key)){
	// 			let children = data.links[key].children;
	// 			for(let chKey in children){
	// 				if(children.hasOwnProperty(chKey)){
	// 					let child = children[key].children;
	// 					routes.push({ path: child.url, component: () => import(child.path), meta:{parent:child.parent, code:child.code} });
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// console.log(routes);
	state.links = data.links;
	// state.appRoutes = routes;
	let adminSTR = {};
	if(localStorage.getItem('adminSTR')){
	  adminSTR = JSON.parse(localStorage.getItem('adminSTR'));
	}
	adminSTR.links = data.links;

	localStorage.setItem('adminSTR', JSON.stringify(adminSTR));
}