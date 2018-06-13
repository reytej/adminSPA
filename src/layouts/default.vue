<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header class="no-shadow">
      <q-toolbar color="primary">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu"><q-icon name="menu" /></q-btn>
        <q-btn flat label="inventory" aria-label="Menu" class="toolbar-btns"/>
        <q-btn flat label="purchasing" aria-label="Menu" class="toolbar-btns"/>
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" class="toolbar-btns">
          <q-icon name="fa fa-cogs" />
        </q-btn>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" class="toolbar-btns">
          <q-icon name="fa fa-user" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer v-model="leftDrawerOpen" color="mainBG" inverted  content-class="no-shadow sidebar">
      <div class="logo">ADMIN</div>
      <q-list no-border link inset-delimiter class="sidebar-list">
        <q-item>
          <q-item-side icon="dashboard" color="primary"/>
          <q-item-main label="Dashboard"/>
        </q-item>
        <q-item>
          <q-item-side icon="exit_to_app" color="primary"/>
          <q-item-main label="Logout"/>
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
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>

<style>
</style>
