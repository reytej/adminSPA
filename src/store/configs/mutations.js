export const setConfigs = (state, data) => {
	let adminSTR = {};
	if(localStorage.getItem('adminSTR')){
	  adminSTR = JSON.parse(localStorage.getItem('adminSTR'));
	}
	state.loaded = Date.now();
	adminSTR.loaded = state.loaded;
	
	state.pages = data.pages;
	adminSTR.pages = state.pages;
	localStorage.setItem('adminSTR', JSON.stringify(adminSTR));
}