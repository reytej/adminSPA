<template>
  <q-page>
    <!-- PAGE BAR -->
      <page-bar>
        <div slot="tools" class="tools pull-right">
          <q-btn flat aria-label="Create" icon="fa fa-plus" label="Add New" @click.native="$router.push('/items_form')"/>
        </div>        
      </page-bar>
    <!-- PAGE BAR -->
    <!-- PAGE CONTENT -->
      <div class="page-content">
        <div class="list-view">
          <q-table dense :columns="listView.columns" :data="listView.datas" :pagination.sync="listView.pagination" row-key="name">
            <q-td slot="body-cell-actions" slot-scope="props" :props="props">
              <q-btn flat aria-label="Edit item"><q-icon name="fa fa-edit" /></q-btn>
              <q-btn flat aria-label="Delete item"><q-icon name="fa fa-ban" /></q-btn>
            </q-td>
          </q-table>  
        </div>
      </div>
    <!-- PAGE CONTENT -->
  </q-page>
</template>
<script>
export default {
  name: 'PageItems',
  data () {
    return {
      listView :  {
                    pagination: {sortBy:'title',descending:false,rowsPerPage: 25},
                    columns   : [
                                  {name:'title',field:'title',label:'Item Name',align:'left',sortable:true},
                                  {name:'description',field:'description',label:'Description Name',align:'left',sortable:true},
                                  {name:'category_name',field:'category_name',label:'Category',align:'left',sortable:true},
                                  {name:'price',field:'price',label:'Price',align:'right',sortable:true},
                                  {name:'cost',field:'cost',label:'Cost',align:'right',sortable:true},
                                  {name:'created_at',field:'created_at',label:'Created At',align:'left',sortable:true},
                                  {name:'actions',field:'actions',label:' ',align:'center',sortable:false},
                                ],
                    datas     : []
                  },
    }
  },
  mounted(){
    this.loadList();
  },
  methods: {
    loadList(){
      this.$q.loading.show(this.$loadflt);
      this.$api.post('items')
      .then((response) => {
        let datas = response.data.details;
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
        datas[i].title = datas[i].code+' - '+datas[i].name; 
        datas[i].category_name = datas[i].category.name; 
        list.push(datas[i]);
      }
      return list;
    },
  }
}
</script>
