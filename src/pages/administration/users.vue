<template>
  <q-page>
    <!-- PAGE BAR -->
      <div class="page-bar shadow-1">
        <div class="title blocks"><q-icon :name="pageIcon" /><span>{{pageName}}</span></div>
        <div class="tools pull-right">
          <q-btn flat aria-label="Create" label="Add New" @click="formOpen()"/>
          <q-btn flat aria-label="Filter"><q-icon name="fa fa-filter" /></q-btn>
          <q-btn flat aria-label="Grid view" v-if="gridView"><q-icon name="fa fa-th" /></q-btn>
          <q-btn flat aria-label="List view" v-if="listView"><q-icon name="fa fa-list" /></q-btn>
        </div>
      </div>
    <!-- PAGE BAR -->
    <!-- PAGE CONTENT -->
      <div class="page-content" style="margin-top: 2px">
        <div class="list-view" v-if="listView" v-show="currView == 'list'">
          <q-table :columns="listView.columns" :data="listView.datas" :pagination.sync="listView.pagination" row-key="name">
            <q-td slot="body-cell-actions" slot-scope="props" :props="props">
              <q-btn flat aria-label="Edit user" @click.native="formOpen(props.value)"><q-icon name="fa fa-edit" /></q-btn>
              <q-btn flat aria-label="Ban user"  @click.native="formOpen(props.value)"><q-icon name="fa fa-ban" /></q-btn>
            </q-td>
          </q-table>
        </div>
      </div>
    <!-- PAGE CONTENT -->
    <!-- PAGE FORM -->
          <q-modal v-model="formMdl" class="form-modal" :content-css="{minWidth: '50vw', minHeight: '45vh'}">
            <q-modal-layout>
              <q-toolbar slot="header">
                <q-btn flat @click="formClose()" class="close" icon="fa fa-times"/>
                <q-toolbar-title v-if="form.title">{{form.title}}</q-toolbar-title>
                <q-toolbar-title v-if="!form.title">Add new User</q-toolbar-title>
              </q-toolbar>
              <div class="body">
                <form :model="form" @submit.prevent="formSave()">
                  <div class="row-input-header">
                    <q-input float-label="Name" v-model="form.name"/>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="row-input">
                        <q-select v-model="form.role" filter autofocus-filter clearable float-label="Role" :options="rolesDrop"/>
                      </div>
                      <div class="row-input">
                        <q-input type="password" float-label="Password" v-model="form.password"/>
                      </div>
                    </div>
                    <div class="col">
                      <div class="row-input">
                        <q-input float-label="Email" v-model="form.email"/>
                      </div>
                      <div class="row-input">
                        <q-input type="password" float-label="Confirm Password" v-model="form.c_password"/>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <q-toolbar slot="footer">
                  <div class="footer-btns">
                    <q-btn flat aria-label="Submit user form" @click="formSave(form.id)">Submit</q-btn>
                    <q-btn flat aria-label="Close user form" @click="formClose()">Cancel</q-btn>
                  </div>
              </q-toolbar>
            </q-modal-layout>
          </q-modal>
    <!-- PAGE FORM -->
  </q-page>
</template>

<script>
import { date } from 'quasar'  
export default {
  name: 'PageUsers',
  data () {
    return {
      pageIcon : this.$router.currentRoute.meta.icon,
      pageName : this.$router.currentRoute.name,
      datas    : [],
      currView : 'list',
      rolesDrop: this.$store.state.helpers.dropdowns.roles,
      listView : {
                  pagination: {sortBy:'name',descending:false,rowsPerPage: 25},
                  columns   : [
                                {name:'id',field:'id',label:'#',align:'left',sortable:true},
                                {name:'name',field:'name',label:'Name',align:'left',sortable:true},
                                {name:'email',field:'email',label:'Email',align:'left',sortable:true},
                                {name:'role',field:'role',label:'Role',align:'left',sortable:true},
                                {name:'created_at',field:'created_at',label:'Created At',align:'left',sortable:true},
                                {name:'actions',field:'actions',label:' ',align:'center',sortable:false},
                              ],
                  datas     : []
                },
      gridView : {datas:[]},
      form     : {}, 
      formMdl  : false, 
    }
  },
  mounted(){
  	this.loadList();
  },
  methods:{
    formOpen(edit){
      this.form = {};
      this.formMdl = true;
      if(edit)
        this.formEdit(edit.id);
    },
    formClose(){
      this.formMdl = false;
    },
    formEdit(id){
      let edit = {};
      for (var i = this.datas.length - 1; i >= 0; i--) {
        if(this.datas[i].id == id){
          edit = {id:this.datas[i].id,name:this.datas[i].name,email:this.datas[i].email,role:this.datas[i].role.code};
          break;
        }
      }
      this.form = edit;
    },
    formSave(id){
      let url = 'users/create';
      if(id){
        url = 'users/update/'+id;
      }

      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary',});
      let formData = new FormData();
      for(let frm in this.form){
        if(this.form.hasOwnProperty(frm) && this.form[frm]){
          formData.append(frm,this.form[frm]);
        }
      }

      this.$api.post(url,formData)
      .then((response) => {
        let data = response.data.details;
        this.loadList();
        this.formClose();
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
    },
    loadList(){
      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary',});
      this.$api.post('users')
      .then((response) => {
        let data = response.data.details;
        this.datas = data;
        let listDatas = [];
        for (var i = data.length - 1; i >= 0; i--) {
          let createDate = date.formatDate(new Date(data[i].created_at),'DD/MM/YYYY');
          let actions = {id:data[i].id};
          listDatas.push({id:data[i].id,name:data[i].name,email:data[i].email,role:data[i].role.code,created_at:createDate,actions:actions});
        }
        this.listView.datas = listDatas;
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
