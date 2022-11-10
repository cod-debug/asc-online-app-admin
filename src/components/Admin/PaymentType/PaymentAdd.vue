<template>
  <div>
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Document Information</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-sm-12 col-md-12 q-pa-sm">
                <q-input outlined
                         label="Payment Description *"
                         v-model="desc"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-12 col-md-6 q-pa-sm"
                  v-for="(item, key) in switches"
                  :key="key">

                <q-toggle
                  v-model="$data[item.var]"
                  :label="item.name"
                  color="red"
                />
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
      "desc": "",
      "amount": false,
      "bankbranch": false,
      "bankname": false,
      "controlnum": false,
      "fundtransfer": false,
      "promisorry": false,
      "reference": false,
      "isonline": true,

      switches: [],
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
      initApp(){
        let vm = this;
        vm.switches = [
          {
            name: "Amount",
            var: 'amount',
          },
          {
            name: "Has Bank Branch",
            var: 'bankbranch',
          },
          {
            name: "Has Bank Name",
            var: 'bankname',
          },
          {
            name: "Has Control Number",
            var: 'controlnum',
          },
          {
            name: "Has Fund Transfer Date",
            var: 'fundtransfer',
          },
          {
            name: "Has Promisorry Date",
            var: 'promisorry',
          },
          {
            name: "Has Reference No",
            var: 'reference',
          }
        ];
      },
      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async getSpecific(){
        let vm = this;

        let payload = {
          id: vm.selectedID
        }
        
        let { data, status } = await this.$store.dispatch("payment/getSpecificPayment", payload);
        console.log(data);
        if([200, 201].includes(status)){
          for(let column in data){
            let bols = ['amount', 'bankbranch', 'bankname', 'controlnum', 'fundtransfer', 'promisorry', 'reference'];
            if(bols.includes(column)){
              console.log(column, ": ",data[column]);
              vm[column] = data[column] == 1 ? true : false;
            } else {
              vm[column] = data[column];
            }
          }
        }
      },

      async submit() {
        let vm = this;
        console.log(vm.amount);

        if (await this.validate()) {
          let payload = {
            "desc": vm.desc.toUpperCase(),
            "amount": vm.amount,
            "bankbranch": vm.bankbranch,
            "bankname": vm.bankname,
            "controlnum": vm.controlnum,
            "fundtransfer": vm.fundtransfer,
            "promisorry": vm.promisorry,
            "reference": vm.reference,
            "isonline": true,
            }
          let endpoint = "payment/addPayment";
          let success_message = "created";
          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "payment/updatePayment";
            
          }
          console.log(payload);
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Payment Type.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            this.$router.push({name: 'payment-lists'})
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
