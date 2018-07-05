<template>
  <q-page>
    <!-- PAGE BAR -->
      <div class="page-bar shadow-1">
        <div class="title blocks"><q-icon :name="pageIcon" /><span>{{pageName}}</span></div>
        <div class="tools pull-right">
          <q-btn flat aria-label="Create" label="Add New" @click="formOpen()"/>
          <q-btn flat aria-label="Filter"><q-icon name="fa fa-search" /></q-btn>
        </div>
      </div>
    <!-- PAGE BAR -->
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'PageRoles',
  data () {
    return {
      pageIcon : this.$router.currentRoute.meta.icon,
      pageName : this.$router.currentRoute.name,
      role_id  : this.$router.currentRoute.params.role_id
    }
  },
  created(){
  },
  mounted(){
    console.log(this.role_id)
  }
}
</script>
