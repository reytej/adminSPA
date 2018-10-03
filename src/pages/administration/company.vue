<template>
  <q-page>
  	<page-bar>
  		<div slot="tools" class="tools pull-right">
  		  <q-btn flat aria-label="Save" icon="fa fa-save" label="Save" @click.native="saveForm()"/>
  		</div>
  	</page-bar>
  	<div class="page-form">
	  	<q-card>
	  	  <q-card-main>
	  	    <div class="head">
	  	    	<q-field helper="Company Name">
	  	    	  <q-input placeholder="Type company name" v-model="form.name"/>
	  	    	</q-field>
	  	    </div>
	  	    <q-card-separator />
	  	    <div class="body">
	  	    	<h5 class="title"><q-icon name="fa fa-info-circle" /> General Information</h5>
	  	    	<div class="row">
		  	    	<div class="col-md-5">
		  	    		<q-field label="TIN" label-width="4">
		  	    		  <q-input v-model="form.tin"/>
		  	    		</q-field>
		  	    		<q-field label="Email" label-width="4">
		  	    		  <q-input v-model="form.email" :after="[{icon: 'fa fa-envelope'}]"/>
		  	    		</q-field>
		  	    		<q-field label="Contact Number" label-width="4">
		  	    		  <q-input v-model="form.contact_no" :after="[{icon: 'fa fa-phone'}]"/>
		  	    		</q-field>
		  	    		<q-field label="Address" label-width="4">
		  	    		  <q-input type="textarea" v-model="form.address" :after="[{icon: 'fa fa-home'}]"/>
		  	    		</q-field>
		  	    	</div>
	  	    	</div>
	  	    </div>
	  	  </q-card-main>
	  	</q-card>
  	</div>
  </q-page>
</template>
<style>
</style>
<script>
export default {
  name: 'PageCompany',
  data () {
    return {
      form     : {}, 
    }
  },
  methods: {
  	saveForm(){
  		let formData = new FormData();
  		for(let frm in this.form){
  			if(this.form.hasOwnProperty(frm)){
  				formData.append(frm,this.form[frm]);
  			}
  		}
  		this.$q.loading.show(this.$loadflt);
  		this.$api.post('company/update',formData)
  		.then((response) => {
  		  let data = response.data.details;
  		  console.log(data);
  		  if(data){
  		  	let noty = this.$noty.success;
  		  	noty.message = response.data.message;
  		  	this.$q.notify(noty);
  		  }
  		  this.$q.loading.hide();
  		})
  		.catch((error) => {
  		  this.$q.notify({
  		    color: 'negative',
  		    position: 'top',
  		    message: 'Failed Something went wrong',
  		    icon: 'report_problem'
  		  });
  		  this.$q.loading.hide();
  		});
  	}
  },
  mounted(){
  	this.$q.loading.show(this.$loadflt);
  	this.$api.post('company')
  	.then((response) => {
  	  let data = response.data.details;
  	  this.form = {
  	  	name 		: 	data.name,
  	  	email 		: 	data.email,
  	  	tin 		: 	data.tin,
  	  	address 	: 	data.address,
  	  	contact_no 	: 	data.contact_no,
  	  }
  	  this.$q.loading.hide();
  	})
  	.catch((error) => {
  	  this.$q.notify({
  	    color: 'negative',
  	    position: 'top',
  	    message: 'Failed to load',
  	    icon: 'report_problem'
  	  });
  	  this.$q.loading.hide();
  	});
  }
}
</script>
