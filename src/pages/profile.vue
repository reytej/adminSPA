<template>
  <div class="page-profile">
    <page-bar/>
    <div class="head">
      <div class="row">
        <div class="col-md-6">
          <div class="logo">
            <img src="statics/default-user-profile.jpg">
          </div>
          <div class="main-details">
            <span class="title">000003 - Rey Tejada</span>
            <span class="subtitle">Administrator</span>
          </div>
        </div>      
        <div class="col-md-6"></div>      
      </div>      
    </div>
    <div class="body">
      <q-tabs align="justify" color="secondary">
        <q-tab slot="title" name="tab-1" label="Account Details" default />
        <q-tab slot="title" name="tab-2" label="Change Password" />
        <q-tab-pane name="tab-1">
          <div class="page-form">
            <div class="body">
              <div class="row">
                <div class="col-md-8">
                  <q-field label="Full Name" label-width="3">
                    <div class="row">
                      <div class="col-md-3" style="padding-right: 5px">
                        <q-input placeholder="First name"/>
                      </div>
                      <div class="col-md-3" style="padding-right: 5px">
                        <q-input placeholder="Middle name"/>
                      </div>
                      <div class="col-md-3" style="padding-right: 5px">
                        <q-input placeholder="Last name"/>
                      </div>
                      <div class="col-md-3" style="padding-right: 5px">
                        <q-input placeholder="Suffix"/>
                      </div>
                    </div>
                  </q-field>
                </div>
              </div>
            </div>
          </div>
        </q-tab-pane>
        <q-tab-pane name="tab-2">
          tab 2          
        </q-tab-pane>
      </q-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageProfile',
  data () {
    return {
    }
  },
  created(){
  },
  mounted(){
  },
  methods:{}
}
</script>
