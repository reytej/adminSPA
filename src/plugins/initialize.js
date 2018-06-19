import { date } from 'quasar'
import { setAuthorizationToken } from './axios'

export default ({ app, router, Vue, store }) => {
  let adminSTR = {};
  // localStorage.clear();
  if(localStorage.getItem('adminSTR')){
    adminSTR = JSON.parse(localStorage.getItem('adminSTR'));
  }
  if (adminSTR.hasOwnProperty('token')) { 
    let now = Date.now();
    let days = date.getDateDiff(now,adminSTR.last,'days');
    if(days == 0){
      setAuthorizationToken(adminSTR.token);
      store.state.user.details = adminSTR.user;
      store.state.user.token = adminSTR.token;
      store.state.user.last = adminSTR.last;
      store.state.user.defaultUrl = adminSTR.defaultUrl;
      if(adminSTR.hasOwnProperty('links'))
        store.state.configs.links = adminSTR.links;
    }
  }
  else{
    store.state.user.details = {};
    store.state.user.token = null;
    store.state.user.last = 0;
    store.state.user.defaultUrl = '';
    store.state.configs.links = [];
  }
}
