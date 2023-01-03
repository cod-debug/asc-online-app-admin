<template>
  <div>
    <q-tabs v-model="tab"
        dense
        align="left"
        class="text-dark"
        indicator-color="blue"
        :no-caps="true">

      <q-tab name="s1" label="S1" @click="setActiveTab('s1')" />

      <q-tab name="s2" label="S2" @click="setActiveTab('s2')" />
    </q-tabs>

<hr class="q-tabs-gutter" color="lightgray" />
    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      <q-table :columns="columns" flat bordered :rows="table_data" row-key="name" hide-bottom @row-click="viewDetails" >
        <template #body="props">
          <q-tr
            :props="props"
            hover
            style="cursor: pointer"
            @click="viewDetails(props.row)"
          >
            <q-td
              key="referrence_code"
              :props="props"
            >
              {{ props.row.referrence_code || '--' }}
            </q-td>
            <q-td
              key="ad_title"
              :props="props"
            >
              {{ props.row.ad_title || '--' }}
            </q-td>
            <q-td
              key="evaluator"
              :props="props"
            >
              <div v-if="props.row.applicant">
                {{ props.row.applicant.fname.toUpperCase() }} 
                {{ props.row.applicant.lname.toUpperCase() }}
              </div>
              <div v-else>
                --
              </div>
            </q-td>
            <q-td
              key="evaluator"
              :props="props"
            >
              <div v-if="props.row.evaluator">
                {{ props.row.evaluator.fname.toUpperCase() }} 
                {{ props.row.evaluator.lname.toUpperCase() }}
              </div>
              <div v-else>
                --
              </div>
            </q-td>
            <q-td
              key="ad_spe"
              :props="props"
            >
              <div v-if="props.row.ad_specialist">
                {{ props.row.ad_specialist.fname.toUpperCase() }} 
                {{ props.row.ad_specialist.lname.toUpperCase() }}
              </div>
              <div v-else>
                --
              </div>
            </q-td>
            <q-td
              key="screener"
              :props="props"
            >
              <div v-if="props.row.screener">
                {{ props.row.screener.fname.toUpperCase() }} 
                {{ props.row.screener.lname.toUpperCase() }}
              </div>
              <div v-else>
                --
              </div>
            </q-td>
            <q-td
              key="reviewer"
              :props="props"
            >
              <div v-if="props.row.reviewer">
                {{ props.row.reviewer.fname.toUpperCase() }} 
                {{ props.row.reviewer.lname.toUpperCase() }}
              </div>
              <div v-else>
                --
              </div>
            </q-td>
            <q-td
              key="current_user"
              :props="props"
            >
              <div v-if="props.row.assigned_user">
                {{ props.row.assigned_user.fname.toUpperCase() }} 
                {{ props.row.assigned_user.lname.toUpperCase() }}
              </div>
              <div v-else>
                --
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <div class="text-right q-mt-md">
        <q-pagination v-model="current"
                      :max="max"
                      direction-links
                      flat
                      color="grey"
                      active-color="primary" />
      </div>
    </div>
    
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="show_reassign_app_modal" :persistent="true">
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Reassign Application</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="closeModal" />
        </q-card-section>

        <q-card-section>
            <div class="form row">
            <div class="col-12 col-md-12 q-pa-md">
              <addReassignment :app_details="selected_app" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  </div>
</template>


<script>
  import addReassignment from "./ARAdd.vue";
  export default {
    name: "member_affiliation_list",

    data: () => ({
      columns: [
        { name: 'referrence_code', align: 'left', label: 'Reference Code', field: 'referrence_code', sortable: false },
        { name: 'ad_title', align: 'left', label: 'AD title', field: 'ad_title', sortable: false },
        { name: 'application_owner', align: 'left', label: 'Application Owner', field: 'application_owner', sortable: false },
        { name: 'evaluator', align: 'left', label: 'Evaluator', field: 'evaluator', sortable: false },
        { name: 'ad_spe', align: 'left', label: 'AD Specialist', field: 'ad_spe', sortable: false },
        { name: 'screener', align: 'left', label: 'Screener', field: 'screener', sortable: false },
        { name: 'reviewer', align: 'left', label: 'Reviewer', field: 'rev', sortable: false },
        { name: 'current_user', align: 'left', label: 'Current Assigned User', field: 'current_user', sortable: false },
      ],
      show_reassign_app_modal: false,

      tab: "s1",
      table_data: [],
      current: 1,
      max: 0,
      size: 5,
      loading_list: true,
      take: 10,

      selected_app: null,
    }),

    watch: {
      current(newVal) {
        if (newVal) {
          this.getList();
        }
      },
      tab(newVal) {
        this.current = 1;
        if (newVal) {
          this.getList();
        }
      }
    },

    components: {
      addReassignment,
    },

    mounted() {
      this.initApp();
    },

    methods: {
      initApp() {
        let vm = this;
        this.getList(false);
      },
      
			setActiveTab(tab){
				this.tab = tab;
			},

      async getAppType() {
        let vm = this;

        let payload = {
          page: this.current,
          size: vm.size,
          order: "reason:asc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("reason/get", payload);
        if ([200, 201].includes(status)) {
          vm.table_data = data.rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }
      },
      
      async getList(is_search){
        let vm = this;
        if(is_search){
          vm.current = 1;
        }
        vm.loading_list = true;
        
        let payload = {
          data: {
            "application_type": ["ALL"],
            "form_group": "ALL",
            "search": "",
            "process_type": "ALL",
            "form_type": vm.tab
          },
          params: {
            take: vm.take,
            page: vm.current
          }
        }
        let {data, status} = await vm.$store.dispatch("s1/getS1Applications", payload);
        if([200, 201].includes(status)){
          vm.table_data = data.data.map((item) => {
            return {...item, 
              company_name: item.company.name, 
              type_medium_name: item.type_of_medium.length > 0 ? item.type_of_medium.map((i) => i.type_of_medium ): '--',
              is_self_assigned: true, // TO BE UPDATED ONCE DONE IN SIR KEVIN'S ENDPOINT
            }
          }) || [];
          vm.max = data.lastPage || 0;
          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }
      },
      
      viewDetails (row) {
        // this.$router.push({name: 'reason-update', params: {
        //   id: row.id
        // }});
        let vm = this;
        vm.selected_app = row;

        this.show_reassign_app_modal = true;
      },
      parseStatus(s) {
        switch (s) {
          case 0:
            return {val: 'inactive', color: 'grey'}
            break;
          case 1:
            return { val: 'active', color: 'green'}
            break;
        }
      },
      closeModal() {

      }
    }
  }

</script>
