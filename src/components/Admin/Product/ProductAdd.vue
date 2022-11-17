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
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Product Information</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-select outlined
                         label="Brand *"
                         :options="brand_options"
                         option-label="desc"
                         option-value="id"
                         v-model="brandId"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-12 q-pa-sm">
                <q-input outlined
                         label="Product *"
                         v-model="desc"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-12 q-pa-sm">
                <q-select outlined
                         label="Category *"
                         :options="category_options"
                         option-label="desc"
                         option-value="id"
                         v-model="categId"
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

      desc: "",
      brandId: null,
      categId: null,

      brand_options: [],
      category_options: [],
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
        this.getBrands();
        this.getCategories();
      },
      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async getSpecific(){
        let vm = this;

        vm.is_loading = true;
        let payload = {
          id: vm.selectedID
        }
        await this.getBrands();
        await this.getCategories();
        
        let { data, status } = await this.$store.dispatch("product/getSpecific", payload);
        console.log(data);
        console.log(vm.brand_options, "OPTIONS");
        if([200, 201].includes(status)){
          for(let column in data){
            vm[column] = data[column];

            if(column == 'brandId'){
              // FETCH AND SET BRAND
              vm.brandId = vm.brand_options.filter((i) => {
                return i.id == data['brandId'];
              })[0];
            } else if (column == 'categId'){
              // FETCH AND SET CATEGORY
              vm.categId = vm.category_options.filter((i) => {
                return i.id == data['brandId'];
              })[0];
            }
          }
          
          vm.is_loading = false;
        }
      },

      async getBrands(){
        let vm = this;
        let payload = {
          page: 1,
          size: 100,
          order: "desc:asc",
          search: "",
        }
        let { data, status } = await vm.$store.dispatch("brand/get", payload);
        vm.brand_options = data.rows;

      },

      async getCategories(){
        let vm = this;
        let payload = {
          page: 1,
          size: 100,
          order: "desc:asc",
          search: "",
        }
        let { data, status } = await vm.$store.dispatch("category/getCategory", payload);
        vm.category_options = data.rows;

      },

      async submit() {
        let vm = this;
        console.log(await this.validate());
        if (await this.validate()) {
          let payload = {
              desc: vm.desc.toUpperCase(),
              brandId: vm.brandId.id,
              categId: vm.categId.id
          }

          let endpoint = "product/add";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "product/update";
          }
            
          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} Product.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            this.$router.push({name: 'product-lists'})
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
