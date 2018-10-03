<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header class="no-shadow">
      <q-toolbar color="primary">
        <q-btn flat dense round @click="sidebarDraw()" aria-label="Menu"><q-icon :name="drawerIcon" /></q-btn>
        <q-btn v-for="(link,key) in links" :key="key" @click.native="goTo(link.path)" flat :label="link.name" :aria-label="link.name" class="toolbar-btns"/>
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat dense round aria-label="Menu" class="toolbar-btns">
          <q-icon name="fa fa-cogs" />
        </q-btn>
        <q-btn flat dense round aria-label="Menu" @click.native="goTo('/profile')" class="toolbar-btns">
          <q-icon name="fa fa-user" />
        </q-btn>
        <q-btn flat dense round @click.native="logOut()" aria-label="Logout" class="toolbar-btns">
          <q-icon name="fa fa-sign-out-alt" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer v-model="leftDrawerOpen" color="secondBG" inverted  content-class="no-shadow sidebar">
      <div class="logo">ADMIN</div>
      <q-list no-border link inset-delimiter class="sidebar-list">
        <q-item  v-for="(link,key) in sideLinks" :key="key" @click.native="goTo(link.path)" v-if="!link.meta.excluded"> 
          <q-item-side :icon="link.meta.icon" color="primary"/>
          <q-item-main :label="link.meta.title"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'LayoutDefault',
  data () {
    return {
      page : '',
      sideLinks : {},
      links : [],
      leftDrawerOpen: this.$q.platform.is.desktop,
      drawerIcon: 'fa fa-chevron-left',
    }
  },
  mounted(){
    this.setLinks();
  },
  watch:{
    '$route' : function(){
      this.setLinks();
    }
  },
  methods:{
    sidebarDraw(){
      this.leftDrawerOpen = !this.leftDrawerOpen;
      if(this.leftDrawerOpen)
        this.drawerIcon = 'fa fa-chevron-left';
      else
        this.drawerIcon = 'fa fa-chevron-right';
    },
    setLinks(){
      let role = this.$store.state.user.details.role;
      let pages = this.$store.state.configs.pages;
      let mainRoutes = this.$router.options.routes[0].children;
      let currRoute = this.$router.currentRoute;
      let mainLinks = [];
      let subLinks = [];
      for (let i = mainRoutes.length - 1; i >= 0; i--) {
        let mnr = mainRoutes[i];
        if(mnr.hasOwnProperty('meta')){
          if(mnr.meta.type == 'main'){
            let code = mnr.meta.code;
            if(role == 'ADMIN')
              mainLinks.push(mnr);
            else{
              if(pages.indexOf(code) != -1)
                mainLinks.push(mnr);
            }
          }
          if(currRoute.meta.parent == mnr.meta.parent && mnr.meta.type == 'sub'){
            let code = mnr.meta.code;
            if(role == 'ADMIN')
              subLinks.push(mnr);
            else{
              if(pages.indexOf(code) != -1)
                subLinks.push(mnr);
            }
          }
        }
      }
      this.links = mainLinks.reverse(); 
      this.sideLinks = subLinks.reverse(); 
    },
    goTo(path){
      this.$router.push(path); 
    },
    logOut(){
      this.$store.commit('user/goLogout');
      this.$router.push('/login'); 
    }
  }
}
</script>

<style>
</style>
