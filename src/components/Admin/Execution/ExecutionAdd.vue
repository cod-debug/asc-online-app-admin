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
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input outlined
                      label="Type of Execution *"
                      v-model="type"
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
      type: "",

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
        this.getMainDocuments();
        this.getClearances();
      },

      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async getMainDocuments(){

        let vm = this;
        let payload = {
          page: 1,
          size: 100,
          order: "desc:asc",
          search: "",
        }
        let { data, status } = await vm.$store.dispatch("type_of_docu/getTypeOfMainDocu", payload);
        if ([200, 201].includes(status)){
          vm.main_docs_options = data.rows;
        }
        console.log("KUHA LIST");
      },

    async getClearances(){
      
      let vm = this;
      let payload = {
        page: 1,
        size: 100,
        order: "type:asc",
        search: "",
      }
      let { data, status } = await vm.$store.dispatch("clearance/get", payload);
        if ([200, 201].includes(status)){
          vm.clearance_options = data.rows;
        }
    },

      async getSpecific(){
        let vm = this;

        vm.is_loading = true;
        let payload = {
          id: vm.selectedID
        }
        
        await this.getClearances();
        await this.getMainDocuments();
        
        let { data, status } = await vm.$store.dispatch("execution/getSpecific", payload);
        console.log(data);
        if([200, 201].includes(status)){
          for(let column in data){
            vm[column] = data[column];
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
            type: vm.type.toUpperCase(),
          }

          let endpoint = "execution/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "execution/update";
          }
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Type of Execution.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            this.$router.push({name: 'execution-lists'})
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
