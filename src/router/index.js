import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store/index'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach((to, from, next) => {
  let logUser = {};
  let token = store.state.user.token;
  if(to.path == "/login" && token != null){
    next({
      path: '/',
    })
  }
  else{    
    if(to.matched.length > 0 && to.matched[0].meta.requireAuth){
      if(token) {
        let loaded = store.state.configs.loaded;
        if(to.path != "/boot"){
          if(loaded != null){
            let pages = store.state.configs.pages;
            let role = store.state.user.details.role;
            if(role != 'ADMIN' && to.path != '/'){
              let excluded = to.meta.excluded;
              let go = true;
              if(!excluded){
                if(pages.indexOf(to.meta.code) == -1)
                  go = false;
              }
              if(go){
                next();
              }
              else{              
                next({path: store.state.user.defaultUrl});
              }
            }
            else{
              next();
            }
          }
          else{
            next({
              path: '/boot',
            })
          }
        }
        else{
          if(loaded != null){
            next({path: store.state.user.defaultUrl})
          }
          else{
            next();
          }          
        }
      } else {
        next({
          path: '/login',
        })
      }
    } else {
      next()
    }    
  }
})

export default Router
