<template>
  <q-expansion-item header-class="text-dark bg-blue-2 shadow-3">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="label_important" color="blue-2" text-color="dark" />
      </q-item-section>

      <q-item-section style="font-size: 18px; flex-wrap: unset;">
        <div class="row q-pa-none">
          <div class="col-md-4">
            <strong>Client Information</strong>
          </div>
          <div class="col-md-4 text-grey-14">
            Affiliation and Company details
          </div>
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center">
          <q-icon name="perm_contact_calendar" color="dark" size="24px" />
        </div>
      </q-item-section>
    </template>


    <q-card class="text-dark bordere-dark q-mb-md" bordered>
      <q-card-section>
        <q-form>
          <div class="row">
            <div class="col-md-7 col-lg-7 col-sm-12 q-pa-sm">
              <q-select outlined label="Client Company Name" v-model="parentData.company_name" disable></q-select>
            </div>
            <div class="col-md-5 col-lg-5 col-sm-12 q-pa-sm">
              <q-select outlined label="Client Membership Affiliation" v-model="parentData.affiliate_name" disable ></q-select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-lg-4 col-sm-12 q-pa-sm">
              <q-input outlined label="Brand" v-model="parentData.brand" disable />
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 q-pa-sm">
              <q-input outlined label="Product" v-model="parentData.product" disable />
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12 q-pa-sm">
              <q-input outlined label="Category" v-model="parentData.category" disable />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
<script>

  export default {
    data: () => ({
      company_name: "",
      affiliation_name: "",
    }),
    computed:{
      parentData(){
        return this.$parent.$parent.$parent.$parent;
      },
    },
    mounted() {
      let vm = this;
      vm.initApp();
    },
    methods: {
      initApp(){
        this.getAffiliation();
      },
      async getAffiliation(){
        if(this.parentData.company.affiliateID){
          // alert("MAY COMPANY NA");
          let vm = this;
          let payload = {
            id: this.parentData.company.affiliateID,
          }

          let {data, status} = await vm.$store.dispatch("affiliation/getSpecificAffiliation", payload);
          if([200, 201].includes(status)){
            vm.affiliation_name = data.name;
          }
        }
      }
    }
  }
</script>
