<template>
  <q-page>
    <!-- PAGE BAR -->
      <div class="page-bar shadow-1">
        <div class="title blocks"><q-icon :name="pageIcon" /><span>{{pageName}}</span></div>
        <div class="tools pull-right">
          <q-btn flat aria-label="Create" label="Add New" @click="formOpen()"/>
          <q-btn flat aria-label="Filter"><q-icon name="fa fa-search" /></q-btn>
        </div>
      </div>
    <!-- PAGE BAR -->
    <!-- PAGE CONTENT -->
      <div class="page-content" style="margin-top: 2px">
        <div class="list-view" v-if="listView" v-show="currView == 'list'">
          <q-table :columns="listView.columns" :data="listView.datas" :pagination.sync="listView.pagination" row-key="name">
            <q-td slot="body-cell-actions" slot-scope="props" :props="props">
              <q-btn flat aria-label="Edit role" @click.native="formOpen(props.value)"   v-if="!props.value.deleted"><q-icon name="fa fa-edit" /></q-btn>
              <q-btn flat aria-label="Ban role"  @click.native="formDelete(props.value)" v-if="!props.value.deleted"><q-icon name="fa fa-ban" /></q-btn>
              <q-btn flat aria-label="Restore role"  @click.native="formRestore(props.value)" v-if="props.value.deleted"><q-icon name="fa fa-redo" /></q-btn>
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
                <q-toolbar-title v-if="!form.title">Add new Role</q-toolbar-title>
              </q-toolbar>
              <div class="body">
                <form :model="form" @submit.prevent="formSave()">
                  <div class="row-input">
                    <q-input float-label="Code" v-model="form.code"/>
                  </div>
                  <div class="row-input">
                    <q-input float-label="Description" v-model="form.description"/>
                  </div>
                </form>
              </div>
              <q-toolbar slot="footer">
                  <div class="footer-btns">
                    <q-btn flat aria-label="Close role form" @click="formClose()">Cancel</q-btn>
                    <q-btn flat aria-label="Submit role form" @click="formSave(form.id)">Submit</q-btn>
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
  name: 'PageRoles',
  data () {
    return {
      pageIcon : this.$router.currentRoute.meta.icon,
      pageName : this.$router.currentRoute.name,
      datas    : [],
      currView : 'list',
      listView : {
                  pagination: {sortBy:'code',descending:false,rowsPerPage: 25},
                  columns   : [
                                {name:'code',field:'code',label:'Code',align:'left',sortable:true},
                                {name:'description',field:'description',label:'Description',align:'left',sortable:true},
                                {name:'created_at',field:'created_at',label:'Created At',align:'left',sortable:true},
                                {name:'deleted_at',field:'deleted_at',label:'Deleted At',align:'left',sortable:true},
                                {name:'actions',field:'actions',label:' ',align:'center',sortable:false},
                              ],
                  datas     : []
                },
      form     : {}, 
      formMdl  : false,
    }
  },
  created(){
  	this.loadList();
  },
  mounted(){
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
          edit = {id:this.datas[i].id,code:this.datas[i].code,description:this.datas[i].description};
          break;
        }
      }
      this.form = edit;
    },
    formSave(id){
      let url = 'roles/create';
      if(id){
        url = 'roles/update/'+id;
      }

      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary'});
      let formData = new FormData();
      for(let frm in this.form){
        if(this.form.hasOwnProperty(frm) && this.form[frm]){
          formData.append(frm,this.form[frm]);
        }
      }

      this.$api.post(url,formData)
      .then((response) => {
        let data = response.data.details;
        if(data){
          
          let noty = this.$noty.success;
          noty.message = 'Role successfully saved';
          this.$q.notify(noty);

          this.loadList();
          this.formClose();
        }
        this.$q.loading.hide();
      })
      .catch((error) => {
        let noty = this.$noty.error;
        noty.message = error.response.data.message;
        this.$q.notify(noty);
        this.$q.loading.hide();
      });
    },
    formDelete(del){
      this.$q.dialog({
        message: 'Are you sure you want to delete this role?',
        ok: 'Delete',
        cancel: 'Cancel'
      }).then(() => {

        this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary'});
        this.$api.post('roles/destroy/'+del.id)
        .then((response) => {
          let data = response.data.details;
          if(data){
            let noty = this.$noty.success;
            noty.message = 'Role successfully deleted';
            this.$q.notify(noty);
            this.loadList();
          }
          this.$q.loading.hide();
        })
        .catch((error) => {
          let noty = this.$noty.error;
          noty.message = error.response.data.message;
          this.$q.loading.hide();
        });

      });
    },
    formRestore(del){
      this.$q.dialog({
        message: 'Are you sure you want to restore this role?',
        ok: 'Restore',
        cancel: 'Cancel'
      }).then(() => {

        this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary'});
        this.$api.post('roles/restore/'+del.id)
        .then((response) => {
          let data = response.data.details;
          if(data){
            let noty = this.$noty.success;
            noty.message = 'Role successfully restored';
            this.$q.notify(noty);
            this.loadList();
          }
          this.$q.loading.hide();
        })
        .catch((error) => {
          let noty = this.$noty.error;
          noty.message = error.response.data.message;
          this.$q.notify(noty);
          this.$q.loading.hide();
        });

      });
    },
    loadList(){
      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary',});
      this.$api.post('roles')
      .then((response) => {
        let data = response.data.details;
        this.datas = data;
        let listDatas = [];
        for (var i = data.length - 1; i >= 0; i--) {
          let createDate = date.formatDate(new Date(data[i].created_at),'DD/MM/YYYY');
          let deletedDate = '';
          let deleted = false;
          if(data[i].deleted_at){
            deletedDate = date.formatDate(new Date(data[i].deleted_at),'DD/MM/YYYY');
            deleted = true;
          }
          let actions = {id:data[i].id,deleted:deleted};
          listDatas.push({code:data[i].code,description:data[i].description,created_at:createDate,deleted_at:deletedDate,actions:actions});
        }
        this.listView.datas = listDatas;
        this.$q.loading.hide();
      })
      .catch((error) => {
        let noty = this.$noty.error;
        noty.message = error.response.data.message;
        this.$q.loading.hide();
      });
    }
  }
}
</script>
