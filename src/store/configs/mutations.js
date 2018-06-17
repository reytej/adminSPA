export const setConfigs = (state, data) => {
	state.links = data.links;
	let adminSTR = {};
	if(localStorage.getItem('adminSTR')){
	  adminSTR = JSON.parse(localStorage.getItem('adminSTR'));
	}
	adminSTR.links = data.links;
	localStorage.setItem('adminSTR', JSON.stringify(adminSTR));
}