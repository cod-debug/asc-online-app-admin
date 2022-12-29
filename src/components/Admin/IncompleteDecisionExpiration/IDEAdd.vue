<template>
  <div>
    <!-- NOMA MEANS Number Of Multiple Applications -->
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          <!-- <div><q-icon name="label_important" class="text-h6 text-red-15" /> Number of Working Days</div> -->
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-12 col-md-12 q-pa-sm">
                <q-input outlined
                         label="Number of Working Days *"
                         v-model="decision_days"
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
      decision_days: null,
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
        
        let { data, status } = await this.$store.dispatch("s1_incomplete_expiration/getSpecific", payload);
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
            decision_days: vm.decision_days,
          }

          let endpoint = "s1_incomplete_expiration/add";
          let success_message = "created";
          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "s1_incomplete_expiration/update";
            
          }
          // console.log(payload);
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} S1 Fees Settlement Period.`,
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
