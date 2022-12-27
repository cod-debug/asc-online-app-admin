<template>
	<div class="q-pa-md q-mt-lg q-ml-lg">
	  <q-card bordered class="my-card" elevated>
		<q-card-section class="row">
		  <div class="text-h6 page-title text-dark col-md-6"><q-icon name="list" />  S1 APPLICATION -  FOR RELEASE</div>
		  <div class="text-right col-md-6">
			<!-- <q-btn label="NEW APPLICATION" elevated class="q-mr-sm position-right" size="md" icon="add" color="red-14" /> -->
			<q-btn :label="localTimer == 0 ? '' : localTimer + ' sec'" elevated size="md" icon="sync" @click="refresh" :disabled="localTimer > 0" color="primary" />
		  </div>
		</q-card-section>
  
		<q-separator inset />
  
		<q-card-section>
		  <div class="row q-my-lg">
			<div class="col-md-12 col-sm-12">
			  <form @submit.prevent="getList(true)" method="POST" >
				<q-input bottom-slots  v-model="search" outlined label="Search Applications" hint="Hit ''Enter'' key or click search icon to search application.">
				  <template v-slot:append>
					<!-- <q-icon v-if="search !== ''" name="close" @click="search = '' && getList(true)" class="cursor-pointer" /> -->
					<q-icon name="search" @click="getList(true)" />
				  </template>
				</q-input>
				<!-- <q-input outlined label="Search Applications" class="q-mt-md"  v-model="search" @blur="getList(true)" /> -->
			  </form>
			</div>
			<!-- <div class="col-md-3 q-px-md col-sm-12">
			  <div class="shadow-2 q-pa-sm">
				<b>Legend: </b>
				<table width="100%">
				  <tr v-for="(item, key) in legends" :key="key">
					<td width="5%">
					  <div :class="`legend ${item.color}`"></div>
					</td>
					<td class="q-pt-xs"><small><strong>{{item.title}}</strong></small></td>
				  </tr>
				</table>
			  </div>
			</div> -->
		  </div>
		  <!-- <q-tabs v-model="active_tab"
				  @update:model-value="getList()"
				  align="left"
				  class="text-dark"
				  indicator-color="primary">
  
			<q-tab :name="item.code" @click="setActiveTab(item.code)" v-for="(item, key) in tabs" :key="key" color="primary">
			  <q-badge :label="item.count" color="red-14" rounded floating />
			  <strong class="q-pr-md">{{item.name}}</strong>
			</q-tab>
		  </q-tabs>
  
		  <hr class="q-tabs-gutter" color="lightgray" v-if="table_data.length > 0" /> -->
  
		
  
		  <div class="table_container" v-if="!is_loading">
			<div v-if="table_data.length <= 0" class="no-data-found">
			  <q-icon name="warning" /> NO DATA FOUND...
			</div>
			<q-table :columns="columns" 
			v-else
			flat 
			bordered 
			:rows="table_data" 
			row-key="id" 
			hide-bottom  
			:rows-per-page-options="[take]"
			@row-click="update" >
			  <template #body="props">
				<q-tr
				  :props="props"
				  :class="(hasOwner(props.row)) ? (isOwned(props.row)) ? 'bg-yellow' : 'bg-grey' : 'bg-white'"
				  hover
				  style="cursor: pointer"
				  @click="update(props.row)"
				>
				  <q-td
					key="referrence_code"
					:props="props"
				  >
					{{ props.row.referrence_code || '--' }}
				  </q-td>
  
				  <q-td
					key="application_type"
					:props="props"
				  >
					{{ props.row.application_type }}
				  </q-td>
  
				  <q-td
					key="company_name"
					:props="props"
				  >
					{{ props.row.company_name }}
				  </q-td>
				  <q-td
					key="brand"
					:props="props"
				  >
					{{ props.row.brand }}
				  </q-td>
				  <q-td
					key="type_medium_name"
					:props="props"
				  >
					{{ props.row.type_medium_name.join(", ") }}
				  </q-td>
				  <q-td
					key="internal_status"
					:props="props"
				  >
					{{ props.row.internal_status }}
				  </q-td>
				  <q-td
					key="payment_status"
					:props="props"
				  >
					{{ props.row.payment_status }}
				  </q-td>
				</q-tr>
			  </template>
			</q-table>
  
			<div class="text-right q-mt-md">
			  <q-pagination v-model="current"
							v-if="max_page"
							@update:model-value="getList()"
							:max="max_page"
							direction-links
							flat
							color="grey"
							active-color="primary" />
			</div>
		  </div>
		  <div v-else class="text-center q-pa-lg">
			<div class="loading-page">
			  <q-spinner-ios color="white" size="3rem" />
			</div>
		  </div>
		  <template>
  
		  <div class="q-pa-md q-gutter-sm">
  
			<q-dialog v-model="lockModal" persistent transition-show="scale" modern transition-hide="scale">
			  <q-card class="bg-red-14 text-white" style="width: 300px">
				<q-card-section>
				  <div class="text-h6 text-center">LOCK APPLICATION?</div>
				</q-card-section>
  
				<q-card-actions align="center" class="bg-white text-red q-py-lg">
				  <q-btn flat label="CONFIRM" @click="confirmLock" />
				  <q-btn flat label="CANCEL" v-close-popup />
				</q-card-actions>
			  </q-card>
			</q-dialog>
		  </div>
		</template>
		</q-card-section>
	  </q-card>
	</div>
  </template>
  
  
  <script>
	import { stat } from "fs";
	import { Notify } from "quasar";
	export default {
	  data: () => ({
		pinkModel: false,
		search: "",
		is_search: false,
		is_loading: true,
		lockModal: false,
		tabs: [
		  // {
		  //   name: "ORIGINAL",
		  //   code: 'ORIGINAL',
		  //   count: 0
		  // },
		  // {
		  //   name: "REVISION",
		  //   code: 'REVISION',
		  //   count: 0
		  // },
		  // {
		  //   name: "COMPLIANCE",
		  //   code: 'COMPLIANCE',
		  //   count: 0
		  // },
		  // {
		  //   name: "RELEASED APPEAL",
		  //   code: 'RELEASED APPEAL',
		  //   count: 0
		  // },
		  // {
		  //   name: "RETURNED APPLICATION",
		  //   code: 'RETURNED APPLICATION',
		  //   count: 0
		  // }
		],
  
	  legends: [
		{
		  color: "blue",
		  theme_color: "blue-2",
		  title: "ORIGINAL",
		},
		{
		  color: "gold",
		  theme_color: "gold",
		  title: "FOR COMPLIANCE",
		},
		{
		  color: "green",
		  theme_color: "green-4",
		  title: "REVISION",
		}
	  ],
  
  
		localTimer: null,
		refresh_sec: 0,
		active_tab: "ALL",
  
		//pagination
		columns: [
		  { name: 'referrence_code', align: 'left', label: 'REFERENCE CODE', field: 'referrence_code', sortable: true },
		  { name: 'application_type', align: 'left', label: 'TYPE OF APPLICATION', field: 'application_type', sortable: true, },
		  { name: 'company_name', align: 'left', label: 'COMPANY NAME', field: 'company_name', sortable: true, },
		  { name: 'brand', align: 'left', label: 'BRAND', field: 'brand', sortable: true, },
		  { name: 'type_medium_name', align: 'left', label: 'TYPE OF MEDIUM', field: 'type_medium_name', sortable: true, },
		  { name: 'internal_status', align: 'left', label: 'INTERNAL STATUS', field: 'internal_status', sortable: true, },
		  { name: 'payment_status', align: 'left', label: 'PAYMENT STATUS', field: 'payment_status', sortable: true, },
		],
		table_data: [],
		take: 10,
		max_page: 0,
		current: 1,
	  }),
	  computed:{
		userID(){
		  return localStorage.getItem('ui');
		}
	  },
	  mounted(){
		this.initApp();
	  },
	  watch: {
	  },
	  methods: {
		initApp(){
		  this.refresh();
		  this.localTimer = localStorage.getItem("timer");
		  this.getList();
		  this.tabs.map(async (item) => {
			item.count = await this.getCount(item.code);
		  });
		},
		
		isOwned(row){
		  if(row.isLocked){
			console.log(row.assigned_user.id, localStorage.getItem('ui'));
			return row.assigned_user.id == localStorage.getItem('ui');
		  } 
		  return false;
		},
		
		hasOwner(row){
		  return row.isLocked;
		},
  
  
		setActiveTab(tab) {
		  this.active_tab = tab;
		},
  
		refresh() {
		  let vm = this;
		  let timer = vm.localTimer <= 0 ? 60 : vm.localTimer;
  
		  vm.refresh_sec = 60;
		  
		  localStorage.setItem('timer', timer);
  
		  setInterval(() => {
			if(timer > 0){
			  timer--;
			  localStorage.setItem('timer', timer);
			  this.localTimer = localStorage.getItem('timer');
			}
			/*if (vm.refresh_sec > 0) {
			  vm.refresh_sec--;
			}*/
		  }, 1000);
		},
  
		redirect(){
		  window.location.href="https://www.facebook.com/";
		},
  
		update(row) {
		  this.selected_item = row;
		  if(row.isLocked){
			if(this.isOwned(row)){
			  this.$router.push({ name: "individual-application-update", params: { id: row.id } });
			} else {
			  Notify.create({
				message: "This application does not belong to you.",
				position: 'top-right',
				closeBtn: "X",
				timeout: 2000,
				color: 'red',
			  });
			}
		  } else {
			this.lockModal = true;
		  }
		},
		
  
		async getList(){
		  let vm = this;
		  if(vm.is_search){
			vm.current = 1;
		  }
		  vm.is_loading = true;
		  
		  let payload = {
			data: {
			  "release_status": "RELEASED",
			  // "application_type": ["REGULAR", "BATCH"],
			  "search": vm.search,
			  // "process_type": vm.active_tab
			},
			params: {
			  take: vm.take,
			  page: vm.current
			}
		  }
		  let {data, status} = await vm.$store.dispatch("asc_user/getPerReleaseStatus", payload);
		  if([200, 201].includes(status)){
			vm.table_data = data.data.map((item) => {
			  return {...item, 
				company_name: item.company.name, 
				type_medium_name: item.type_of_medium.length > 0 ? item.type_of_medium.map((i) => i.type_of_medium ): '--',
				is_self_assigned: true, // TO BE UPDATED ONCE DONE IN SIR KEVIN'S ENDPOINT
			  }
			}) || [];
			vm.max_page = data.lastPage || 0;
			vm.is_loading = false;
		  } else {
			vm.is_loading = false;
		  }
		},
  
		async getCount(processType){
		  let vm = this;
		  let payload = {
  
			data: {
			  "form_group": "FOR RELEASE",
			  "application_type": ["REGULAR", "BATCH"],
			  "search": vm.search,
			  "process_type": processType
			},
			params: {
			  take: vm.take,
			  page: vm.current
			}
		  }
		  let {data, status} = await vm.$store.dispatch("s1/getS1Applications", payload);
  
		  return data.data.length;
		},
  
		async confirmLock(){
		  let vm = this;
		  let payload = {
			assigned_user_id: this.userID,
			id: vm.selected_item.id
		  }
		  
		  let {data, status} = await this.$store.dispatch("asc_user/lockApp", payload);
  
		  if([200, 201].includes(status)){
			Notify.create({
			  message: data.message,
			  position: 'top-right',
			  closeBtn: "X",
			  timeout: 2000,
			  color: 'green',
			});
  
			vm.lockModal = false;
			this.getList();
		  }
		},
	  }
	}
  </script>
  
  