<template>
  <q-expansion-item header-class="text-dark bg-blue-2 shadow-3">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="label_important" color="blue-2" text-color="dark" />
      </q-item-section>

      <q-item-section style="font-size: 18px; flex-wrap: unset;">
        <div class="row q-pa-none">
          <div class="col-md-4">
            <strong>Final Material</strong>
          </div>
          <div class="col-md-4 text-grey-14">
            Audio, Video, or Layout
          </div>
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center">
          <q-icon name="upload" color="dark" size="24px" />
        </div>
      </q-item-section>
    </template>


    <q-card class="text-dark bordere-dark q-mb-md" bordered>
      <q-card-section>
        <q-card bordered class="q-pa-sm">
          <q-card-section class="q-pa-sm">
            <br />
            <div class="q-mt-sm">
              <q-icon name="upload" class="text-red-15" style="font-size: 24px" /> FINAL MATERIAL
            </div>
          </q-card-section>

          <q-card-section>
            <div class="row">
              <div class="col-sm-12 q-pa-sm">
                <div class="q-gutter-sm">
                  <div class="">
                    <label>File Path:</label>
                    <br />
                    <label class="text-grey-14">{{parentData.final_material}}</label>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 q-pa-sm text-right">
                <q-btn color="red-14" @click="viewDoc(parentData.final_material)">
                  <q-icon name="open_in_new" />
                  VIEW DOCUMENT
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
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
      viewDoc(doc){
        // console.log(doc);
        // return false;
        window.open(doc, "_blank");
      },
      async getAffiliation(){
        if(this.parentData.company.affiliateID){
          // alert("MAY COMPANY NA");
          let vm = this;
          let payload = {
            id: this.parentData.company.affiliateID,
          }

          let {data, status} = await vm.$store.dispatch("admin_api/getSpecificAffiliation", payload);
          if([200, 201].includes(status)){
            vm.affiliation_name = data.name;
          }
        }
      }
    }
  }
</script>
