export const setLoginUser = (state, data) => {
	state.token = data.token;
	state.details = data.user;
	state.last = Date.now();
	// localStorage.setItem('c8user', JSON.stringify({'user':state.user,'db':state.db,token:state.token,'last':state.last}));
}
export const goLogout = (state, token) => {
	state.user = null;
	state.db = null;
	state.token = null;
	state.last = 0;
	// localStorage.removeItem('c8user');
}
