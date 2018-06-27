<template>
  <q-page>
  	<div class="page-bar shadow-1">
  		<div class="title">
  			<q-icon :name="pageIcon" />
  			<span>{{pageName}}</span>
  		</div>
  		<div class="tools pull-right">
  			tools
  		</div>
  	</div>
  </q-page>
</template>
<script>
export default {
  name: 'PageItems',
  data () {
    return {
      pageIcon : 'fa fa-archive',
      pageName : 'Items',
    }
  },
  mounted(){
  	// console.log(this.$store.state.user.details);
  }
}
</script>
