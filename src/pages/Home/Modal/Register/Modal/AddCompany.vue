<template>
  <div class="q-gutter-sm">
    <q-dialog v-model="add_company" :persistent="true">

      <q-card style="width: 800px; max-width: 80vw;" class="q-pa-md">

        <q-card-section class="row items-center">
          <div>
            <div class="text-h6 text-red-15 text-bold"><i class="fa fa-building text-dark"></i> Company</div>
          </div>

          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="closeAddCompanyModal" />
        </q-card-section>

        <hr class="q-tabs-gutter" color="lightgray" />

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
        </div>

        <div class="q-pa-md">
          <q-card bordered class="my-card" elevated :square="true">
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
        </div>

        <hr class="q-tabs-gutter" color="lightgray" />

        <q-card-section>
          <q-btn color="primary" @click="submit"><q-icon name="save" /> Save</q-btn>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import { Notify } from "quasar";

  export default {
    props: ["closeAddCompanyModal", "saveCompany"],
    data: () => ({
      add_company: true,
      company_name: "",
      affiliation: "",
      mobile_num: "",
      telephone_number: "",
      alt_telephone_number: "",
      company_tin: "",
      accounting_rep: "",
      accounting_rep_email: "",
      country: "",
      company_address: "",
      options: [],
      current: 1,
      size: 2000,
    }),

    mounted() {
      this.initApp();
    },

    methods: {
      initApp() {
        this.getAllAffiliation();
      },
      async validate(evt) {
        return await this.$refs.company_info_form.validate() && await this.$refs.company_adress_form.validate();
      },

      async getAllAffiliation() {
        let payload = {
          page: this.current,
          size: this.size,
          order: "id:asc",
          search: "",
        }
        this.loading_list = true;

        try {
          let { data, status } = await this.$store.dispatch('affiliation/getAllAffiliation', payload);

          if ([200, 201].includes(status)) {
             data.rows.map((item) => {
               this.options.push({ value: item.id, label: item.name });
            });
          }
        } catch (e) {

          console.log(e, "STATUS");

        }
        this.loading_list = false;
      },

      async submit() {
        console.log(await this.validate());

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
            "affiliateID": this.affiliation.value
          }

          let { data, status } = await this.$store.dispatch('company/addCompany', payload);
          console.log(data, "ADD COMPANY");
          if ([200, 201].includes(status)) {

            this.closeAddCompanyModal();

            Notify.create({
              message: 'Successfully added company.',
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

      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },


    }

  }
</script>
