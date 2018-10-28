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
          <q-toolbar-title v-if="!form.title">Add new Item</q-toolbar-title>
        </q-toolbar>
        <div class="body">
          <form :model="form" @submit.prevent="formSave()">
            <div class="row-input-header">
              <q-input float-label="Item Code" v-model="form.code"/>
            </div>
            <div class="row-input-header">
              <q-input float-label="Description" v-model="form.description"/>
            </div>
            <div class="row">
              <div class="col">
                <div class="row-input">
                  <q-select v-model="form.category_id" filter autofocus-filter clearable float-label="Category" :options="stockCategoriesDrop"/>
                </div>
                <div class="row-input">
                  <q-select v-model="form.division_id" filter autofocus-filter clearable float-label="Division" :options="stockDivisionsDrop"/>
                </div>
              </div>
              <div class="col">
                <div class="row-input">
                  <q-select v-model="form.origin_id" filter autofocus-filter clearable float-label="Origin" :options="stockOriginsDrop"/>
                </div>
                <div class="row-input">
                  <q-select v-model="form.default_uom" filter autofocus-filter clearable float-label="Reporting UOM" :options="stockUomsDrop"/>
                </div>
              </div>
              <!--<div class="col">-->
                <!--<div class="row-input">-->
                  <!--<q-input float-label="Email" v-model="form.email"/>-->
                <!--</div>-->
                <!--<div class="row-input">-->
                  <!--<q-input type="password" float-label="Confirm Password" v-model="form.c_password"/>-->
                <!--</div>-->
              <!--</div>-->
            </div>
            <div class="row-input-header">
              <q-input float-label="Remarks" v-model="form.remarks"/>
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
      //stockCategoriesDrop : this.$store.state.helpers.dropdowns.stock_categories,
      stockCategoriesDrop : [],
      //stockDivisionsDrop : this.$store.state.helpers.dropdowns.stock_divisions,
      stockDivisionsDrop : [],
      //stockOriginsDrop : this.$store.state.helpers.dropdowns.stock_origins,
      stockOriginsDrop : [],
      stockUomsDrop : [],
      currView : 'list',
      listView :  {
                    pagination: {sortBy:'code',descending:false,rowsPerPage: 25},
                    columns   : [
                                  {name:'code',field:'code',label:'Item Code',align:'left',sortable:true},
                                  {name:'description',field:'description',label:'Description Name',align:'left',sortable:true},
                                  {name:'category',field:'category',label:'Category',align:'left',sortable:true},
                                  {name:'division_name',field:'division_name',label:'Division',align:'left',sortable:true},
                                  {name:'origin_name',field:'origin_name',label:'Origin',align:'left',sortable:true},
                                  {name:'tax_type_id',field:'tax_type_id',label:'Tax Type',align:'left',sortable:true},
                                  {name:'default_uom',field:'default_uom',label:'Default UOM',align:'left',sortable:true},
                                  //{name:'qty_per_box',field:'qty_per_box',label:'Qty per UOM',align:'left',sortable:true},
                                  //{name:'actual_cost',field:'actual_cost',label:'Actual Cost',align:'right',sortable:true},
                                  //{name:'last_cost',field:'last_cost',label:'Last Cost',align:'right',sortable:true},
                                  //{name:'remarks',field:'remarks',label:'Remarks',align:'right',sortable:true},
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
        console.log('edit');
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
                    code: row.code,
                    description: row.description,
                    category_id: row.category_id,
                    division_id: row.division_id,
                    origin_id: row.origin_id,
                    default_uom: row.default_uom,
                    remarks: row.remarks
                };
                // PLOT MO DITO YUNG MGA MODEL NUNG NASA FORM  AT

                // edit = {id:this.datas[i].id,name:this.datas[i].name,email:this.datas[i].email,role:this.datas[i].role.code};
                break;
            }
        }
        this.form = edit;
    },
    formSave(id){
          let url = 'stock_items/store';
          if(id){
              url = 'stock_items/update/'+id;
          }

          this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary'});
          let formData = new FormData();
          for(let frm in this.form){
              if(this.form.hasOwnProperty(frm) && this.form[frm]){
                  // o kaya dtio
                  formData.append(frm,this.form[frm]);
              }
          }
        console.log(this.form);
          this.$api.post(url,formData)
              .then((response) => {
              let data = response.data.details;
              console.log(data);
          if(data.status == 'success'){

              let noty = this.$noty.success;
              noty.message = 'Stock item successfully saved';
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
              // let noty = this.$noty.error;
              // noty.message = error.response.data.message;
              // this.$q.notify(noty);
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
          this.$api.post('stock_items/delete/'+del.id)
              .then((response) => {
              let data = response.data.details;
          if(data){
                let noty = this.$noty.success;
                noty.message = 'Stock item successfully deleted';
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
      //this.$q.loading.show(this.$loadflt);
      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary',});
      this.$api.post('stock_items')
      .then((response) => {
        let datas = response.data.details.stock_items;
        this.datas = response.data.details.stock_items; // PARA MASAVE YUNG BUONG LIST NA DI NAEEDIT
        //console.log(datas);

        this.stockCategoriesDrop = response.data.details.stock_categories;
        this.stockDivisionsDrop = response.data.details.stock_divisions;
        this.stockOriginsDrop = response.data.details.stock_origins;
        this.stockUomsDrop = response.data.details.stock_uoms;

          // this.datas = data;
          // let listDatas = [];
          // for (var i = data.length - 1; i >= 0; i--) {
          //     let actions = {id:data[i].id,deleted:deleted};
          //     let roleCode = "Role Not Found";
          //     if(data[i].role)
          //         roleCode = data[i].role.code;
          //     listDatas.push({id:data[i].id,name:data[i].name,email:data[i].email,role:roleCode,created_at:createDate,deleted_at:deletedDate,actions:actions});
          // }

        // for(var i = datas.length - 1; i >= 0; i--){
        //     let deleted = false;
        //     if(datas[i].deleted_at){
        //         deletedDate = date.formatDate(new Date(datas[i].deleted_at),'DD/MM/YYYY');
        //         deleted = true;
        //     }
        //     let actions = {id:datas[i].id,deleted:deleted};
        // }

        //console.log(datas);

        this.listView.datas = this.initDatas(datas);
        this.$q.loading.hide();
      })
      .catch((error) => {
        let noty = this.$noty.error;
        noty.message = 'Failed to load';
        this.$q.loading.hide();
      });
    },
    initDatas(datas){
      let list = [];
      for (var i = datas.length - 1; i >= 0; i--) {

        //datas[i].title = datas[i].code+' - '+datas[i].name;
        datas[i].code = datas[i].code;
        datas[i].description = datas[i].description;
        datas[i].category = datas[i].category.category;
        datas[i].division_name = datas[i].division.division;
        datas[i].origin_name = datas[i].origin.origin;
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
