<template>
  <div>
    <div class="loading-page" v-if="is_loading">
      <div class="text-center">
        <q-spinner-ios color="white" size="3rem" />
        <br />
        <span class="text-white">FETCHING DATA</span>
      </div>
    </div>
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Company Penalty Information</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-select outlined
                      label="Company *"
                      option-label="name"
                      option-value="id"
                      :options="company_options"
                      v-model="compId"
                      :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input outlined
                      type="number"
                      label="Amount *"
                      v-model="amount"
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
  import { Notify } from "quasar";

  export default {
    data: () => ({
      is_loading: false,
      compId: null,
      amount: null,

      company_options: [],
    }),
    watch: {
    },
    computed: {
      is_update(){
        if(this.$route.params.id){
          this.getSpecific();
          return true;
        } else {
          this.initApp();
          return false;
        }
      },

      selectedID(){
        return this.$route.params.id
      }
    },

    mounted() {
    },

    methods: {
      initApp(){
        this.getAllCompanies();
      },

      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async getAllCompanies(){

        let vm = this;
        let payload = {
          page: 1,
          size: 1000,
          order: "name:asc",
          search: "",
        }
        let { data, status } = await vm.$store.dispatch("company/getAllCompanies", payload);
        if ([200, 201].includes(status)){
          console.log(data.rows, "COMPANY LISTS!");
          vm.company_options = data.rows;
        }
      },

      async getSpecific(){
        let vm = this;

        vm.is_loading = true;
        let payload = {
          id: vm.selectedID
        }
        
        await this.getAllCompanies();
        
        let { data, status } = await vm.$store.dispatch("company_penalties/getSpecific", payload);
        console.log(data);
        if([200, 201].includes(status)){
          for(let column in data){
            vm[column] = data[column];
            if(column == 'compId'){
                // FETCH AND SET SCREENER
                vm.compId = vm.company_options.filter((i) => {
                  return i.id == data.compId;
                })[0];
              }
          }

          vm['static_val'] = data.static;
        }
        vm.is_loading = false;
      },

      async submit() {
        let vm = this;
        console.log(await this.validate());
        if (await this.validate()) {
          let payload = {
              compId: vm.compId.id,
              amount: vm.amount,
            }

          let endpoint = "company_penalties/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "company_penalties/update";
          }

          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Brand Penalties.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            this.$router.push({name: 'company-penalty-lists'})
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
