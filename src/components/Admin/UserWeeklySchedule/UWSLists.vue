<template>
  <div>

    <div class="q-pa-md">
      <q-form ref="announcement_form"
              @submit.prevent="submit"
              :greedy="true">
        <div class="row">
          <div class="col-12 col-md-6 q-pa-sm">
            <q-select outlined
                      label="ASC Internal User *"
                      :options="asc_users"
                      option-label="fullname"
                      option-value="id"
                      v-model="selected_user"
                      style="min-width: 100%;"
                      :rules="[val => !!val || 'Field is required']" />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <q-date v-model="sched_additional" v-if="selected_user" multiple :rules="[val => !!val.length > 0 || 'Field is required']" />
          </div>
        </div>
      </q-form>

      <hr class="q-tabs-gutter" color="lightgray" />

      <div>
        <q-btn color="primary" class="q-mt-xl" @click="submit"><q-icon name="save" /> {{is_update ? 'Save Changes' : 'Save'}}</q-btn>
      </div>

    </div>

    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      <div class="row">
        <div class="col-md-6 q-pa-sm">
          <q-table :columns="columns" :rows-per-page-options="[0]"  title="Current Dates" flat bordered :rows="sched" hide-bottom v-if=" sched.length > 0" >
            <template v-slot:body-cell-date="props">
              <q-td :props="props">
                {{props.row}}
              </q-td>
            </template>
            
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn label="Delete" @click="removeCurrent(props.rowIndex)" color="red-14" />
              </q-td>
            </template>
          </q-table>

          <div class="text-right q-mt-md" v-if="sched.length > 0">
          </div>
        </div>
        
        <div class="col-md-6 q-pa-sm">
          <q-table :columns="columns" title="Additional Dates" flat bordered :rows="sched_additional" hide-bottom v-if=" sched.length > 0" >
            <template v-slot:body-cell-date="props">
              <q-td :props="props">
                {{props.row}}
              </q-td>
            </template>
            
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn label="Delete" @click="removeAdditional(props.rowIndex)" color="red-14" />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Notify } from 'quasar';

  

  export default {
    name: "member_affiliation_list",

    data: () => ({
      columns: [
        { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: false },
        { name: 'action', align: 'left', label: 'Action', field: 'status', sortable: false },
      ],

      asc_users: [],
      
      table_data: [],
      current: 1,
      max: 0,
      size: 10,
      loading_list: true,

      sched_additional: [],

      selected_user: null,
      sched: [],

    }),
    computed: {
      is_update(){
        return this.sched.length > 0 ? true : false;
      }
    },
    watch: {
      current(newVal) {
        if (newVal) {
          this.getAppType();
        }
      },
      selected_user(newVal){
        if(newVal != null){
          this.getSpecific();
          this.sched_additional = [];
        }
      }
    },

    components: {
    },

    mounted() {
      this.initApp();
    },

    methods: {
      formatDate(d){
        return  d.getFullYear;
      },
      initApp() {
        let vm = this;
        // this.getAppType();
        this.getAllNONASC();
      },
      removeCurrent(index){
        this.sched.splice(index, 1);
      },
      removeAdditional(index){
        this.sched_additional.splice(index, 1);
      },
      async submit2(){
        let vm = this;
        let merged_sched = [...vm.sched, ...vm.sched_additional];
        let payload = {
          id: this.selected_user.id,
          sched: merged_sched,
        }
        console.log(payload);
      },
      
      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async submit() {
        let vm = this;
        console.log(await this.validate());
        if (await this.validate()) {
          let merged_sched = [...vm.sched, ...vm.sched_additional];
          let payload = {
            id: this.selected_user.id,
            sched: merged_sched,
          }

          let endpoint = "weekly_user_schedule/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "weekly_user_schedule/update";
          }
          
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Weekly User Schedule.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
          } else {

            Notify.create({
              message: data.message,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'red',
            })
          }
        } else {
          Notify.create({
            message: 'Validation error. Kindly check all fields!',
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
          })
        }
      },

      async getAllNONASC() {
        this.loading = true;
        let vm = this;

        vm.loading_list = true;
        let payload = {
          page: 1,
          size: 10000,
          order: "id:asc",
          search: "",
        };
        let { data, status } = await this.$store.dispatch("account/getAllUsers", payload);

        if ([200, 201].includes(status)) {
          this.$nextTick(() => {
            this.rows = data.rows;
            vm.asc_users = data.rows;
            vm.current = data.cpage;
            vm.max = data.tpage;
            this.loading = false;
          })
        }

        vm.loading_list = false;
      },

      async getSpecific(){
        let vm = this;

        let payload = {
          id: vm.selected_user.id
        }
        
        let { data, status } = await this.$store.dispatch("weekly_user_schedule/getSpecific", payload);
        
        if([200, 201].includes(status) && data){
          let new_date = data.sched.map((item) => {
            let d = new Date(item);
            let month = d.getMonth()+1 > 10 ? d.getMonth()+1 : "0"+(d.getMonth() + 1);
            let date = d.getDate()+1 > 10 ? d.getDate()+1 : "0"+d.getDate();
            return `${d.getFullYear()}/${month}/${date}`;
          });
          vm.sched = new_date;
          
        } else {
          vm.sched = [];
        }

        console.log(vm.sched);
      },

      // async getAppType() {
      //   let vm = this;

      //   let payload = {
      //     page: this.current,
      //     size: vm.size,
      //     order: "reason:asc",
      //     search: "",
      //   }
      //   vm.loading_list = true;
      //   let { data, status } = await vm.$store.dispatch("reason/get", payload);
      //   if ([200, 201].includes(status)) {
      //     vm.table_data = data.rows;
      //     vm.current = data.cpage;
      //     vm.max = data.tpage;
      //     vm.loading_list = false;
      //   } else {
      //     vm.loading_list = false;
      //   }
      // },
      
      // viewDetails (evt, row) {
      //   this.$router.push({name: 'reason-update', params: {
      //     id: row.id
      //   }});
      // },
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
