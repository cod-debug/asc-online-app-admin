<template>
  <div>
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Holiday Information</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-12 col-md-6 q-pa-sm">
                <q-input outlined
                        type="number"
                         label="S1 Expiration No. of Years *"
                         v-model="s1_expire"
                         :rules="[val => !!val || 'Field is required']" />
                
              </div>
              <div class="col-12 col-md-6 q-pa-sm">
                <q-input outlined
                        type="number"
                         label="S2 Expiration No. of Years *"
                         v-model="s2_expire"
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
      s1_expire: "",
      s2_expire: "",

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
        
        let { data, status } = await this.$store.dispatch("application_expiration/getSpecific", payload);
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
            s1_expire: vm.s1_expire,
            s2_expire: vm.s2_expire,
          }

          let endpoint = "application_expiration/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "application_expiration/update";
          }
          
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} S1 and S2 Expiration.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            // this.$router.push({name: 's1-s2-expiration-lists'})
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
