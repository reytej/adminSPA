<template>
  <q-page>
  	<div class="page-bar shadow-1">
  		<div class="title blocks">
  			<q-icon :name="pageIcon" />
  			<span>{{pageName}}</span>
  		</div>
  		<div class="tools pull-right">
  			<q-btn flat aria-label="Create" label="Add New"/>
  			<q-btn flat aria-label="Filter">
  			  <q-icon name="fa fa-filter" />
  			</q-btn>
  			<q-btn flat aria-label="Grid view">
  			  <q-icon name="fa fa-th" />
  			</q-btn>
  			<q-btn flat aria-label="List view">
  			  <q-icon name="fa fa-list" />
  			</q-btn>
  		</div>
  	</div>
  </q-page>
</template>

<script>
export default {
  name: 'PageUsers',
  data () {
    return {
      pageIcon : this.$router.currentRoute.meta.icon,
      pageName : this.$router.currentRoute.name,
    }
  },
  mounted(){
  	// console.log(this.$store.state.user.details);
  }
}
</script>
