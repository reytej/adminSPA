<template>
  <q-page>
  	<div class="page-bar shadow-1">
  		<div class="title">
  			<q-icon :name="pageIcon" />
  			<span>{{pageName}}</span>
  		</div>
  		<div class="tools pull-right">
  			
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

<style  lang="stylus">
@import '~variables'
.page-bar
	position: relative
	background-color:#fff
	width : 100%
	height : 50px
	padding-top : 13px
	padding-left : 10px
	padding-right : 10px
.page-bar .title
	position: relative
	display: inline-block
	width: auto;
	max-width: 150px
	margin: 0 
	font-weight : 500
	font-size : 18px
.page-bar .title .q-icon
	display: inline-block
	font-size: 24px
	margin-right : 5px
.page-bar .tools
	display: inline-block
	width: auto;
	max-width: 150px
	margin: 0
	float:right 
</style>
