<template>
  <div>
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Company Information</div>
          <q-form ref="company_info_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-sm-12 col-md-8 q-pa-sm">
                <q-input outlined
                         label="Company Name *"
                         v-model="company_name"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-4 q-pa-sm">
                <q-select v-model="affiliation"
                          input-debounce="0"
                          outlined
                          label="Affiliation *"
                          :options="options"
                          :option-value="(option) => option === null ? null : option.id"
                          :option-label="(option) => option === null ? null : option.name"
                          :rules="[val => !!val || 'Field is required']">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-md-3 q-pa-sm">
                <q-input outlined
                         label="Mobile Number *"
                         v-model="mobile_num"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-3 q-pa-sm">
                <q-input outlined
                         label="Telephone Number *"
                         v-model="telephone_number"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-3 q-pa-sm">
                <q-input outlined
                         label="Alternate Telephone Number*"
                         v-model="alt_telephone_number"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-3 q-pa-sm">
                <q-input outlined
                         label="TIN *"
                         v-model="company_tin"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input outlined
                         label="Accounting Representative *"
                         v-model="accounting_rep"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input outlined
                         label="Representative Email Address *"
                         v-model="accounting_rep_email"
                         type="email"
                         :rules="[val => !!val || 'Field is required', isValidEmail]" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-card bordered class="my-card q-my-md" elevated :square="true">
        <q-card-section>
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Address</div>
          <q-form ref="company_adress_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input outlined
                         label="Country *"
                         v-model="country"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input outlined
                         label="Company Address *"
                         v-model="company_address"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <hr class="q-tabs-gutter" color="lightgray" />

      <div>
        <q-btn color="primary" class="q-mt-xl" @click="submit"><q-icon name="save" /> {{is_update ? 'Save Changes' : 'Save'}}</q-btn>
        <q-btn color="red-14" outline class="q-mt-xl q-ml-md" :to="{name:'company-lists'}"><q-icon name="cancel"/> Cancel</q-btn>
      </div>

    </div>
  </div>
</template>
<script>
  import { Notify } from "quasar";
  export default {
    data: () => ({
      add_company: true,
      company_name: "",
      affiliation: {},
      mobile_num: "",
      telephone_number: "",
      alt_telephone_number: "",
      company_tin: "",
      accounting_rep: "",
      accounting_rep_email: "",
      country: "",
      company_address: "",
      options: [],

      size: 100,
    }),

    mounted() {
      this.initApp();
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

    methods: {

      async validate(evt) {
        return await this.$refs.company_info_form.validate() || await this.$refs.company_adress_form.validate();
      },

      async submit() {
        console.log(await this.validate());
        let vm = this;

        if (await this.validate()) {
          let payload = {
            "type": "c",
            "name": this.company_name.toUpperCase(),
            "address": this.company_address.toUpperCase(),
            "country": this.country.toUpperCase(),
            "tinno": this.company_tin.toUpperCase(),
            "phone": this.telephone_number.toUpperCase(),
            "mobile": this.mobile_num.toUpperCase(),
            "contact": {
              "title": "NA",
              "fname": this.accounting_rep.toUpperCase(),
              "lname": "NA",
              "mname": "NA",
              "phone": "NA",
              "email": this.accounting_rep_email
            },
            // id of the affilaition
            "affiliateID": this.affiliation.id
          }

          

          let endpoint = "company/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "company/update";
          }

          let { data, status } = await this.$store.dispatch(endpoint, payload);
          if ([200, 201].includes(status)) {
            Notify.create({
              message: `Successfully ${success_message} company.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
          } else {
            Notify.create({
              message: 'Something went wrong!',
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: "red"
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

      initApp() {
        this.getAllAffiliation();
      },

      async getSpecific(){
        let vm = this;

        vm.is_loading = true;
        let payload = {
          id: vm.selectedID
        }
        
        await this.getAllAffiliation();
        
        let { data, status } = await vm.$store.dispatch("company/getSpecific", payload);
        // console.log(data);
        if([200, 201].includes(status)){
          vm.company_name = data.name;
          vm.company_address = data.address;
          vm.affiliation.id = data.affiliateId;
          vm.country = data.country.code;
          vm.company_tin = data.tinno;
          vm.telephone_number = data.phone;
          vm.mobile_num = data.mobile,


          // for(let column in data){
          //   vm[column] = data[column];
          //   if(column == 'compId'){
          //       // FETCH AND SET SCREENER
          //       vm.compId = vm.company_options.filter((i) => {
          //         return i.id == data.compId;
          //       })[0];
          //     }
          // }


          vm['static_val'] = data.static;
        }
        vm.is_loading = false;
      },

      async getAllAffiliation() {
        let payload = {
          page: 1,
          size: this.size,
          order: "id:asc",
          search: "",
        }

        try {
          let { data, status } = await this.$store.dispatch('affiliation/getAllAffiliation', payload);
          this.options = data.rows;
        } catch (e) {

        }
      },

      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },


    }

  }
</script>
