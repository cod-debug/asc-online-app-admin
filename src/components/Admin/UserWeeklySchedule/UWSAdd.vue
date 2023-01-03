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
              <div class="col-12 q-pa-sm">
                <q-date v-model="sched" multiple :rules="[val => !!val || 'Field is required']" /> />
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
    props: ["id"],
    data: () => ({
      sched: [],
      asc_users: [],
      selected_user: null,
      
      current: 1,
      max: 0,
      size: 5,
      loading_list: true,
      take: 10,
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
    },

    methods: {

      async validate(evt) {
        return await this.$refs.announcement_form.validate();
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

      async submit() {
        let vm = this;
        console.log(await this.validate());
        if (await this.validate()) {
          let payload = {
            sched: vm.sched,
          }

          let endpoint = "reason/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "reason/update";
          }
          
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Main Reason Type.`,
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
