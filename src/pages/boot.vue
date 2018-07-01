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
   this.goBoot();
   // this.$api.post('getConfigs')
   //  .then((response) => {
   //    let data = response.data.details;
   //    this.$store.commit('configs/setConfigs',data);
   //    this.$router.go(this.$store.state.user.defaultUrl);
   //  })
   //  .catch((error) => {
   //    this.$q.notify({
   //      color: 'negative',
   //      position: 'top',
   //      message: error.response.data.message,
   //      icon: 'report_problem'
   //    });
   //  });
  },
  mounted(){
    // if(Object.keys(this.$store.state.configs.links).length > 0)
      // this.$router.go(this.$store.state.user.defaultUrl);
  },
  methods:{
    async goBoot(){
      await this.$axios.post(this.$apiUrl + 'getConfigs')
      .then( (response) => {
        let data = response.data.details;
        this.$store.commit('configs/setConfigs',data);
      })
      .catch((error) => {});   
      await this.$axios.post(this.$apiUrl + 'dropdowns/roles')
      .then( (response) => {
        let data = response.data.details;
        this.$store.commit('helpers/setDropdown',{dropName: 'roles', options: data});
      })
      .catch((error) => {});
      this.$router.go(this.$store.state.user.defaultUrl);   
    }
  }
}
</script>
