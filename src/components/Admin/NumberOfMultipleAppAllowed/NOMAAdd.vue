<template>
  <div>
    <!-- NOMA MEANS Number Of Multiple Applications -->
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Number of Multiple Application Allowed</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input outlined
                         label="Min *"
                         v-model="minimum"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input outlined
                         label="Max *"
                         v-model="maximum"
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
      minimum: null,
      maximum: null,
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
        
        let { data, status } = await this.$store.dispatch("number_of_multi_app/getSpecific", payload);
        console.log(data);
        if([200, 201].includes(status)){
          for(let column in data){
            let bols = ['basis', 'expire', 'input', 'launch', 'remark', 'remark', 'variant'];
            if(bols.includes(column)){
              vm[column] = data[column] ? true: false;
            } else {
              vm[column] = data[column];
            }
          }
        }
      },

      async submit() {
        let vm = this;
        console.log(await this.validate());
        if (await this.validate()) {
          let payload = {
            minimum: vm.minimum,
            maximum: vm.maximum,
          }
          let endpoint = "number_of_multi_app/add";
          let success_message = "created";
          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "number_of_multi_app/update";
            
          }
          console.log(payload);
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Document Type.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            // this.$router.push({name: 'document-size-lists'})
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
