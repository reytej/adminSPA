<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header class="no-shadow">
      <q-toolbar color="primary">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu"><q-icon name="menu" /></q-btn>
        <q-btn v-for="(link,key) in links" :key="key" @click.native="goTo(link.url)" flat :label="link.name" :aria-label="link.name" class="toolbar-btns"/>
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat dense round aria-label="Menu" class="toolbar-btns">
          <q-icon name="fa fa-cogs" />
        </q-btn>
        <q-btn flat dense round aria-label="Menu" class="toolbar-btns">
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
        <q-item  v-for="(link,key) in sideLinks" :key="key" @click.native="goTo(link.url)" > 
          <q-item-side :icon="link.icon" color="primary"/>
          <q-item-main :label="link.name"/>
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
      links : this.$store.state.configs.links,
      leftDrawerOpen: this.$q.platform.is.desktop
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
    setLinks(){
      if(this.$router.currentRoute.matched[0].meta.code){
        this.page = this.$router.currentRoute.matched[0].meta.code; 
      }
      if(this.links.hasOwnProperty(this.page)){
        this.sideLinks = this.links[this.page].children;
      }
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
