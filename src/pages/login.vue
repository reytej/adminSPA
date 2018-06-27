<template>
  <q-page class="flex flex-center" style="background-color: #f1f1f1">
    <q-card inline style="width: ;" class="card-form">
  	  <q-card-main class="body" style="background-color: #fff">

        <form :model="loginForm" ref="loginForm">
          <div class="row-input">
              <q-input float-label="Username" @keyup.enter.native="submitForm()" v-model="loginForm.email" :after="[{icon: 'fa fa-user'}]" />
          </div>
          <div class="row-input">
              <q-input float-label="Password" @keyup.enter.native="submitForm()" v-model="loginForm.password" type="password" :after="[{icon: 'fa fa-lock'}]" no-pass-toggle />
          </div>        
          <div class="row-btn">
            <q-btn color="primary" class="full-width" label="Login" @click="submitForm()" />
          </div>
        </form>
    		        
  	  </q-card-main>
	  </q-card>
  </q-page>
</template>

<script>
import { setAuthorizationToken } from 'plugins/axios'
export default {
  name: 'Login',
  data () {
    return {
      loginForm : {
        email: '',
        password: '',        
      }
    }
  },
  methods: {
    submitForm(){
      var formData = new FormData();
      formData.append('email', this.loginForm.email);
      formData.append('password', this.loginForm.password);
      this.$q.loading.show({
        spinner: 'QSpinnerOval',
        messageColor: 'primary',
        spinnerSize: 250,
        spinnerColor: 'primary',
      });
      this.$api.post('login',formData)
      .then((response) => {
        let data = response.data.details;
        this.$store.commit('user/setLoginUser',data);
        setAuthorizationToken(data.token);
        this.$router.push('/boot');
        this.$q.loading.hide();
      })
      .catch((error) => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: error.response.data.message,
          icon: 'report_problem'
        });
        this.$q.loading.hide();
      });
    }
  }
}
</script>