<template>
  <q-page>
    <!-- PAGE BAR -->
      <page-bar :subtitle="subtitle">
        <div slot="tools" class="tools pull-right">
          <q-btn flat aria-label="Save" icon="fa fa-save" label="Save" @click.native="savePages()"/>
          <q-btn flat aria-label="Back to list" icon="fa fa-table" label="Back to List" @click.native="$router.push('/roles')"/>
        </div>        
      </page-bar>
    <!-- PAGE BAR -->
      <div class="page-form">
      <q-card>
        <q-card-title>
          <strong>Set Access of {{details.code}} - {{details.description}}</strong>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-tree
            :nodes="pages"
            color="secondary"
            default-expand-all
            :expanded.sync="pagesExd"
            :ticked.sync="ticked"
            tick-strategy="leaf"
            node-key="value"
          />
        </q-card-main>
      </q-card>
      </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'PageRoles',
  data () {
    return {
      subtitle : [],
      role_id  : this.$router.currentRoute.params.role_id,
      details  : {},
      ticked   : [],
      tickStrat: 'leaf',
      pages    : [],
      pagesExd : [],
    }
  },
  created(){
  },
  mounted(){
    let links = this.$router.options.routes[0].children;
    let allPage = { label: 'Pages', value:'all', children: []};
    for (var i = links.length - 1; i >= 0; i--) {
      if(links[i].meta){
        if(links[i].meta.type == 'main' && !links[i].meta.excluded){
          let mainLink = links[i];
          let main = {value:mainLink.meta.code, label:mainLink.name.toUpperCase(),children:[]};
          for (var sub = links.length - 1; sub >= 0; sub--) {
            if(links[sub].meta && links[sub].meta.type == 'sub' && mainLink.meta.code == links[sub].meta.parent){
              let subLink = links[sub];
              let child = {value:subLink.meta.code, label:subLink.meta.title, icon:subLink.meta.icon,children:[]};
              for (var gnd = links.length - 1; gnd >= 0; gnd--) {
                if(links[gnd].meta && links[gnd].meta.type == 'sub' && mainLink.meta.code == links[gnd].meta.parent){
                  let gndLink = links[gnd];
                  let gndChild = {value:gndLink.meta.code, label:gndLink.meta.title, icon:gndLink.meta.icon};
                  child.children.push(gndChild);
                }
              }
              if(child.children.length > 0)
                 this.pagesExd.push(child.value); 
              main.children.push(child);
            }
          }
          if(main.children.length > 0)
             this.pagesExd.push(main.value); 
          allPage.children.push(main);
        }
      }
    }
    this.pagesExd.push("all"); 
    this.pages.push(allPage);
    this.loadDetails();
  },
  methods: {
    getLinkDetails(code){
      let links = this.$router.options.routes[0].children;
      let link = {};
      for (var lnk = links.length - 1; lnk >= 0; lnk--) {
        if(links[lnk].meta.code == code){
          link = links[lnk];
          break;
        }
      }
      return link;
    },
    savePages(){
      let url = 'roles/update/'+this.role_id;
      let pages = [];
      for (var i = this.ticked.length - 1; i >= 0; i--) {
        pages.push(this.ticked[i]);
        let tick = this.getLinkDetails(this.ticked[i]);
        if(tick.meta.type == 'sub' && tick.meta.parent && pages.indexOf(tick.meta.parent) == -1){
          pages.push(tick.meta.parent);
        } 
      }
      let pagesStr = pages.join(",");
      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary'});
      let formData = new FormData();
      formData.append('pages',pagesStr);
      this.$api.post(url,formData)
      .then((response) => {
        let data = response.data.details;
        if(data){
          let noty = this.$noty.success;
          noty.message = 'Role Pages successfully saved';
          this.$q.notify(noty);
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
    loadDetails(){
      this.$q.loading.show({messageColor: 'primary',spinnerSize: 250,spinnerColor: 'primary',});
      this.$api.post('roles/get/'+this.role_id)
      .then((response) => {
        let data = response.data.details;
        if(data){
          this.details = data;
          this.ticked = this.details.pages.split(",");
          this.subtitle.push(this.details.code+' - '+this.details.description);
        }  
        else{
          let noty = this.$noty.error;
          noty.message = "Role not found";
          this.$router.push('/roles');  
        }
        this.$q.loading.hide();
      })
      .catch((error) => {
        this.$router.push('/roles'); 
        this.$q.loading.hide();
      });
    }
  }
}
</script>
