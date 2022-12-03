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
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Type of Medium Informations</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-select outlined
                      label="Type of Main Document *"
                      option-label="name"
                      option-value="id"
                      :options="main_docs_options"
                      v-model="docmainId"
                      :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input outlined
                      label="Type of Medium *"
                      v-model="desc"
                      :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-12 q-pa-sm">
                <q-select outlined
                        label="Type of Clearance *"
                        v-model="clearanceId"
                        :options="clearance_options"
                        option-value="id"
                        option-label="type"
                        :rules="[val => !!val || 'Field is required']" />
              </div>
            </div>
            
            <q-separator />

            <div class="row">
              <div class="col-12 col-md-3">
                
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="single" label="Single Media" color="red-12" />
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="multi" label="Multimedia" color="red-12" />
              </div>
            </div>
            
            <q-separator />

            <div class="row">
              <div class="col-12 col-md-3">
                
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="moving" label="Multimedia Moving" color="red-12" />
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="static_val" label="Multimedia Static" color="red-12" />
              </div>
            </div>
            
            <q-separator />

            <div class="row">
              <div class="col-12 col-md-3">
                
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="execution" label="Execution Enable" color="red-12" />
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="static_val" label="Static Enable" color="red-12" />
              </div>

              <div class="col-12 col-md-3"></div>
              <div class="col-12 col-md-3"></div>

              <div class="col-12 col-md-3">
                <q-toggle v-model="length" label="Length Enable" color="red-12" />
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="language" label="Language Enable" color="red-12" />
              </div>

              <div class="col-12 col-md-3"></div>
              <div class="col-12 col-md-3"></div>

              <div class="col-12 col-md-3">
                <q-toggle v-model="size" label="Size Enable" color="red-12" />
              </div>
              <div class="col-12 col-md-3">
                <q-toggle v-model="width" label="Width Enable" color="red-12" />
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
      desc: "",
      single: false,
      multi: false,
      moving: false,
      static_val: false,
      execution: false,
      language: false,
      length: false,
      width: false,
      size: false,
      others: false,
      clearanceId: null,
      docmainId: null,

      main_docs_options: [],
      clearance_options: [],
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
        
        let { data, status } = await vm.$store.dispatch("medium/getSpecific", payload);
        console.log(data);
        if([200, 201].includes(status)){
          for(let column in data){
            vm[column] = data[column];
            if(column == 'docmainId'){
                // FETCH AND SET BRAND
                vm.docmainId = vm.main_docs_options.filter((i) => {
                  return i.id == data['docmainId'];
                })[0];
              } else if (column == 'clearanceId'){
                // FETCH AND SET CATEGORY
                vm.clearanceId = vm.clearance_options.filter((i) => {
                  return i.id == data['clearanceId'];
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
              desc: vm.desc.toUpperCase(),
              single: vm.single,
              multi: vm.multi,
              moving: vm.moving,
              static: vm.static_val,
              execution: vm.execution,
              language: vm.language,
              length: vm.length,
              width: vm.width,
              size: vm.size,
              others: vm.others,
              clearanceId: vm.clearanceId.id,
              docmainId: vm.docmainId.id,
            }

          let endpoint = "medium/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "medium/update";
          }
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Type of Medium.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            this.$router.push({name: 'medium-lists'})
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
