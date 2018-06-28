<template>
  <q-page>
    <!-- PAGE BAR -->
      <div class="page-bar shadow-1">
        <div class="title blocks"><q-icon :name="pageIcon" /><span>{{pageName}}</span></div>
        <div class="tools pull-right">
          <q-btn flat aria-label="Create" label="Add New"/>
          <q-btn flat aria-label="Filter"><q-icon name="fa fa-filter" /></q-btn>
          <q-btn flat aria-label="Grid view" v-if="gridView"><q-icon name="fa fa-th" /></q-btn>
          <q-btn flat aria-label="List view" v-if="listView"><q-icon name="fa fa-list" /></q-btn>
        </div>
      </div>
    <!-- PAGE BAR -->
    <!-- PAGE CONTENT -->
      <div class="page-content" style="margin-top: 2px">
        <div class="list-view" v-if="listView" v-show="currView == 'list'">
          <q-table :columns="listView.columns" :data="listView.datas" :pagination.sync="listView.pagination" row-key="name" />
        </div>
      </div>
    <!-- PAGE CONTENT -->
  </q-page>
</template>

<script>
export default {
  name: 'PageUsers',
  data () {
    return {
      pageIcon : this.$router.currentRoute.meta.icon,
      pageName : this.$router.currentRoute.name,
      datas    : [],
      currView : 'list',
      listView : {
                  pagination: {rowsPerPage: 25},
                  columns   : [
                                {name:'name',field:'name',label:'Name',align:'left',sortable:true},
                                {name:'email',field:'email',label:'Email',align:'left',sortable:true},
                                {name:'role',field:'role',label:'Role',align:'left',sortable:true},
                                {name:'created_at',field:'created_at',label:'Created At',align:'left',sortable:true},
                              ],
                  datas     : []
                },
      gridView : {datas:[]},
    }
  },
  created(){
  	this.loadList();
  },
  mounted(){
  },
  methods:{
    loadList(){
      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary',});
      this.$api.post('users')
      .then((response) => {
        let data = response.data.details;
        this.datas = data;
        let listDatas = [];
        for (var i = data.length - 1; i >= 0; i--) {
          listDatas.push({name:data[i].name,email:data[i].email,role:data[i].role.code,created_at:data[i].created_at});
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
