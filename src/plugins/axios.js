import axios from 'axios'

let headers = {
	    'Content-Type' 		: 'application/json',
	    'Accept' 			: 'application/json',
	    'X-Requested-With' 	: 'XMLHttpRequest',
}

export default ({ store , Vue }) => {
  Vue.prototype.$axios = axios;
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['Accept'] = 'application/json'
  var baseUrl = 'http://backend.test/api/';
  Vue.prototype.$apiUrl = baseUrl;
  Vue.prototype.$api = axios.create({
	  baseURL: baseUrl
  });
}

export function setAuthorizationToken(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

