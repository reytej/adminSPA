import { date } from 'quasar'
import { setAuthorizationToken } from './axios'

export default ({ app, router, Vue, store }) => {
  // let c8user = {};
  // if(localStorage.getItem('c8user')){
  //   c8user = JSON.parse(localStorage.getItem('c8user'));
  // }
  // if (c8user.hasOwnProperty('token')) { 
  //   let now = Date.now();
  //   let days = date.getDateDiff(now,c8user.last,'days');
  //   if(days == 0){
  //     store.state.user.user = c8user.user;
  //     store.state.user.db = c8user.db;
  //     store.state.user.token = c8user.token;
  //     store.state.user.last = c8user.last;
  //     setAuthorizationToken(c8user.token);
  //   }
  // }
}
