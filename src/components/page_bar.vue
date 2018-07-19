<template>
	<div class="page-bar shadow-1">
    <div class="title blocks"><q-icon :name="pageIcon" /><span>{{pageName}}</span></div>
	  <div class="subtitle blocks" v-if="pageSubtitle" v-for="sub in pageSubtitle">{{sub}}</div>
    <slot name="tools"></slot>
	</div>
</template>
<script>
export default {
  props	: ['subtitle'],
  name 	: 'PageBar',
  data () {
    return {
      pageIcon     : this.$router.currentRoute.meta.icon,
      pageName     : this.$router.currentRoute.meta.title,
      pageSubtitle : this.subtitle,
    }
  }
}
</script>