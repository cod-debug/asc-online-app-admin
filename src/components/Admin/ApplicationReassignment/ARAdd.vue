<template>
  <div>
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Reason Information</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-12 col-md-6 q-pa-sm">
                <q-input outlined label="Reference Code" v-model="selected_details.referrence_code" disable />
              </div>
              <div class="col-12 col-md-6 q-pa-sm">
                <q-input outlined label="Application Owner" v-model="selected_details.application_owner" disable />
              </div>
              <div class="col-12 q-pa-sm">
                <q-input outlined label="AD Title" v-model="selected_details.ad_title" disable />
              </div>
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
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <hr class="q-tabs-gutter" color="lightgray" />

      <div>
        <q-btn color="primary" class="q-mt-xl" @click="submit"><q-icon name="save" /> {{is_update ? 'Save Changes' : 'Save'}}</q-btn>
      </div>

    </div>
  </div>
</template>
<script>
  import { cp } from "fs";
import { Notify } from "quasar";
  export default {
    props: {
      app_details: Object,
    },
    data: () => ({
      reason: "",
      asc_users: [],
      selected_user: null,

      current: 1,
      size: 1000,
      max: 0,
      loading_list: false,

      selected_details: {},
    
    }),
    watch: {
    },
    computed: {
      is_update(){
        if(this.$route.params.id){
          this.getSpecific();
          return true;
        } else {
          return false;
        }
      },

      selectedID(){
        return this.$route.params.id
      }
    },

    mounted() {
      this.initApp();
    },

    methods: {

      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      initApp(){
        let vm = this;
        for(let column in vm.app_details) {
          vm.selected_details[column] = vm.app_details[column];
        }
        vm.selected_details.application_owner = `${vm.app_details.applicant.fname} ${vm.app_details.applicant.lname}`;
        console.log(vm.selected_details, "SELECTED DETIALS INSIDE THE MODAL!");
        this.getAllNONASC();
      },

      async getAllNONASC() {
        this.loading = true;
        let vm = this;

        vm.loading_list = true;
        let payload = {
          page: vm.current,
          size: vm.size,
          order: "id:asc",
          search: "",
          filter: "asc"
        };
        let { data, status } = await this.$store.dispatch("account/getAllUsers", payload);

        if ([200, 201].includes(status)) {
          this.$nextTick(() => {
            let allowed_users_only = data.rows.filter((item) => {
              return item.type == vm.app_details.assigned_userRole.type;

            })

            vm.asc_users = allowed_users_only;
          })
        }

        vm.loading_list = false;
      },

      async getSpecific(){
        let vm = this;

        let payload = {
          id: vm.selectedID
        }
        
        let { data, status } = await this.$store.dispatch("reason/getSpecific", payload);
        console.log(data);
        if([200, 201].includes(status)){
          for(let column in data){
            vm[column] = data[column];
          }
        }
      },

      async submit() {
        let vm = this;
        console.log(await this.validate());
        if (await this.validate()) {
          let payload = {
              id: vm.app_details.id,
              data: {
                "assigned_user_id": vm.selected_user.id,
                "assigned_userRole": vm.app_details.assigned_userRole.id
              }
          }

          let endpoint = "asc_user/reassign";
          let success_message = "reassigned";
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Application`,
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

      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },


    }

  }
</script>
