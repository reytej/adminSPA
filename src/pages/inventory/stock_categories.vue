<template>
  <q-page>
    <!-- PAGE BAR -->
      <page-bar>
        <div slot="tools" class="tools pull-right">
          <!--q-btn flat aria-label="Create" icon="fa fa-plus" label="Add New" @click.native="$router.push('/items_form')"/-->
          <q-btn flat aria-label="Create" icon="fa fa-plus" label="Add New" @click="formOpen()"/>
        </div>        
      </page-bar>
    <!-- PAGE BAR -->
    <!-- PAGE CONTENT -->
      <div class="page-content">
        <div class="list-view">
          <q-table dense :columns="listView.columns" :data="listView.datas" :pagination.sync="listView.pagination" row-key="name">
            <q-td slot="body-cell-actions" slot-scope="props" :props="props">
              <!--q-btn flat aria-label="Edit item"><q-icon name="fa fa-edit" /></q-btn>
              <q-btn flat aria-label="Delete item"><q-icon name="fa fa-ban" /></q-btn-->

              <q-btn flat aria-label="Edit item" @click.native="formOpen(props.row)"   v-if="!props.row.deleted"><q-icon name="fa fa-edit" /></q-btn>
              <q-btn flat aria-label="Delete item"  @click.native="formDelete(props.row)" v-if="!props.row.deleted"><q-icon name="fa fa-ban" /></q-btn>
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
          <q-toolbar-title v-if="!form.title">Add new Stock Category</q-toolbar-title>
        </q-toolbar>
        <div class="body">
          <form :model="form" @submit.prevent="formSave()">
            <div class="row-input-header">
              <q-input float-label="Category Name" v-model="form.category"/>
            </div>
          </form>
        </div>
        <q-toolbar slot="footer">
          <div class="footer-btns">
            <q-btn flat aria-label="Close user form" @click="formClose()">Cancel</q-btn>
            <q-btn flat aria-label="Submit user form" @click="formSave(form.id)">Submit</q-btn>
          </div>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
    <!-- PAGE FORM -->
  </q-page>
</template>
<script>
export default {
  name: 'PageItems',
  data () {
    return {
      pageIcon : this.$router.currentRoute.meta.icon,
      pageName : this.$router.currentRoute.meta.title,
      datas    : [],
      currView : 'list',
      listView :  {
                    pagination: {sortBy:'category',descending:false,rowsPerPage: 25},
                    columns   : [
                                  {name:'category',field:'category',label:'Item Category',align:'left',sortable:true},
                                  {name:'actions',field:'actions',label:' ',align:'center',sortable:false},
                                ],
                    datas     : []
                  },
      form     : {},
      formMdl  : false,
    }
  },
  mounted(){
    this.loadList();
  },
  methods: {
    formOpen(edit){
        this.form = {};
        this.formMdl = true;
        //console.log(edit); // LAHAT NG VALUE NUNG ROW
        if(edit)
            this.formEdit(edit.id); //PINASA YUNG ID SA FORM EDIT
    },
    formClose(){
        this.formMdl = false;
    },
    formEdit(id){
        //console.log('edit');
        let edit = {};
        //this.datas ito kasi yung pinagbabasihan
        for (var i = this.datas.length - 1; i >= 0; i--) {
            //console.log(this.datas[i]);
            let row = this.datas[i];
            if(this.datas[i].id == id){
                //console.log(row);
                edit = {
                    //code: datas.property nung code
                    id: row.id,
                    category: row.category
                };
                // PLOT MO DITO YUNG MGA MODEL NUNG NASA FORM  AT

                // edit = {id:this.datas[i].id,name:this.datas[i].name,email:this.datas[i].email,role:this.datas[i].role.code};
                break;
            }
        }
        this.form = edit;
    },
    formSave(id){
          let url = 'stock_categories/store';
          if(id){
              url = 'stock_categories/update/'+id;
          }

          this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary'});
          let formData = new FormData();
          for(let frm in this.form){
              if(this.form.hasOwnProperty(frm) && this.form[frm]){
                  // o kaya dtio
                  formData.append(frm,this.form[frm]);
              }
          }
        //console.log(this.form);
          this.$api.post(url,formData)
              .then((response) => {
              let data = response.data.details;
              //console.log(data);
          if(data.status == 'success'){

              let noty = this.$noty.success;
              noty.message = 'Stock category successfully saved';
              this.$q.notify(noty);

              this.loadList();
              this.formClose();
          }else{

              for (let err in data.errors){
                  // console.log(data.errors[err]);
                  let noty = this.$noty.negative;
                  noty.message = data.errors[err][0];
                  this.$q.notify(noty);
              }

          }
          this.$q.loading.hide();
      })
      .catch((error) => {
            let noty = this.$noty.negative;

          noty.message = error.response.data.message;
          this.$q.notify(noty);
          this.$q.loading.hide();
      });
    },
    formDelete(del){
          this.$q.dialog({
              message: 'Are you sure you want to delete this item?',
              ok: 'Delete',
              cancel: 'Cancel'
          }).then(() => {

              this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary'});
          this.$api.post('stock_categories/delete/'+del.id)
              .then((response) => {
              let data = response.data.details;
          if(data){
                let noty = this.$noty.success;
                noty.message = 'Stock category was successfully deleted';
                this.$q.notify(noty);
                this.loadList();
            }
            this.$q.loading.hide();
        })
        .catch((error) => {
                let noty = this.$noty.negative;
            noty.message = error.response.data.message;
            this.$q.notify(noty);
            this.$q.loading.hide();
        });

      });
    },
    loadList(){
      //this.$q.loading.show(this.$loadflt);
      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary',});
      this.$api.post('stock_categories')
      .then((response) => {
        let datas = response.data.details;
        this.datas = response.data.details; // PARA MASAVE YUNG BUONG LIST NA DI NAEEDIT

        //this.stockCategoriesDrop = response.data.details.stock_categories;
        //this.stockDivisionsDrop = response.data.details.stock_divisions;
        //this.stockOriginsDrop = response.data.details.stock_origins;
        //this.stockUomsDrop = response.data.details.stock_uoms;

        this.listView.datas = this.initDatas(datas);
        this.$q.loading.hide();
      })
      .catch((error) => {
        let noty = this.$noty.negative;
        noty.message = 'Failed to load';
        this.$q.loading.hide();
      });
    },
    initDatas(datas){
      let list = [];
      for (var i = datas.length - 1; i >= 0; i--) {

        datas[i].category = datas[i].category;
        datas[i].deleted = datas[i].deleted;

              let deleted = false;
              if(datas[i].deleted){
                  deleted = true;
              }
              let actions = {id:datas[i].id,deleted:deleted};
        datas[i].actions = datas[i].actions;
        list.push(datas[i]);
      }
      return list;
    },
  }
}
</script>
