import store from '../index'

export const setLoginUser = (state, data) => {
	state.token = data.token;
	state.details = data.user;
	state.defaultUrl = data.defaultUrl;
	state.last = Date.now();
	localStorage.clear();
	localStorage.setItem('adminSTR', JSON.stringify({'user':state.details,'token':state.token, 'last':state.last,'defaultUrl':state.defaultUrl}));
}
export const goLogout = (state, token) => {
	state.user = null;
	state.db = null;
	state.token = null;
	state.last = 0;
	store.state.configs.loaded = null;
	store.state.configs.links = [];
	store.state.configs.pages = [];
	localStorage.clear();
}
