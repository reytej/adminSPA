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
	  	    <q-card-separator />
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
  created(){
  	// console.log(this.$store.state.user.details);
  }
}
</script>
