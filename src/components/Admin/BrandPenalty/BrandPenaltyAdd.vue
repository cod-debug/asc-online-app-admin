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
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Brand Penalty Information</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-select outlined
                      label="Brand *"
                      option-label="desc"
                      option-value="id"
                      :options="brands_options"
                      v-model="brandId"
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
      brandId: null,
      amount: null,

      brands_options: [],
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
        this.getAllBrands();
      },

      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async getAllBrands(){

        let vm = this;
        let payload = {
          page: 1,
          size: 1000,
          order: "desc:asc",
          search: "",
        }
        let { data, status } = await vm.$store.dispatch("brand/get", payload);
        if ([200, 201].includes(status)){
          vm.brands_options = data.rows;
        }
      },

      async getSpecific(){
        let vm = this;

        vm.is_loading = true;
        let payload = {
          id: vm.selectedID
        }
        
        await this.getAllBrands();
        
        let { data, status } = await vm.$store.dispatch("brand_penalties/getSpecific", payload);
        console.log(data);
        if([200, 201].includes(status)){
          for(let column in data){
            vm[column] = data[column];
            if(column == 'brandId'){
                // FETCH AND SET SCREENER
                vm.brandId = vm.brands_options.filter((i) => {
                  return i.id == data.brandId;
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
              brandId: vm.brandId.id,
              amount: vm.amount,
            }

          let endpoint = "brand_penalties/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "brand_penalties/update";
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
            this.$router.push({name: 'brand-penalty-lists'})
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
