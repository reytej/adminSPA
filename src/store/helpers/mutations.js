export const setDropdown = (state, data) => {
	let adminSTR = {};
	let dropName = data.dropName;
	let options = data.options;
	state.dropdowns[dropName] = options;
	if(localStorage.getItem('adminSTR')){
	  adminSTR = JSON.parse(localStorage.getItem('adminSTR'));
	}
	if(!adminSTR.helpers){
		adminSTR.helpers = {};
	}
	if(!adminSTR.helpers.dropdowns){
		adminSTR.helpers.dropdowns = {};
	}
	adminSTR.helpers.dropdowns = state.dropdowns;
	localStorage.setItem('adminSTR', JSON.stringify(adminSTR));
}
