<template>
  <q-page class="flex flex-center">
    <q-spinner color="primary" size="40px" />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageBoot',
  created(){
  	this.$api.post('getConfigs')
    .then((response) => {
      let data = response.data.details;
      this.$store.commit('configs/setConfigs',data);
    })
    .catch((error) => {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: error.response.data.message,
        icon: 'report_problem'
      });
    });
  },
  mounted(){
    if(Object.keys(this.$store.state.configs.links).length > 0)
      this.$router.go(this.$store.state.user.defaultUrl);
  }
}
</script>
