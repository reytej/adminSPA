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
  data () {
    return {
      goTo : '/',
    }
  },
  created(){
   this.goBoot();
  },
  mounted(){
  },
  methods:{
    async goBoot(){
      let formData = new FormData();
      formData.append('role','EMPLY');
      await this.$axios.post(this.$apiUrl + 'getConfigs',formData)
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
      this.$router.go(this.goTo);   
    }
  }
}
</script>
