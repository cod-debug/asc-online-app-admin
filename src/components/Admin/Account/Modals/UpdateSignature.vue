<template>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="icon" :persistent="true">
        <q-card style="width: 900px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Update User Role</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup @click="closeModal" />
          </q-card-section>
  
          <q-card-section>
              <div class="form row">
              <div class="col-12 col-md-12 q-pa-md">
                <q-input outlined label="User Role" v-model="name" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  
    export default {
      props: ['closeModal', 'modal_type', 'selected_item', 'is_update'],
      data: () => ({
        icon: true,
  
        // USER INFORMATION
        name: "",
  
        active_tab: "UserDetails",
        tab: "user",
      }),
      mounted() {
        this.initApp();
      },
  
      methods: {
        async getSpecific(){
          let vm = this;
          let payload = {
            id: vm.selected_item.id
          }
          let {data, status} = await this.$store.dispatch('account/getOneUser', payload);
          if([200, 201].includes(status)){
            for(let col in data){
              vm[col] = data[col];
            }
          }
        },
        initApp() {
          if (this.modal_type === 'approval') {
            for (let column in this.selected_item) {
              this[column] = this.selected_item[column];
            }
          }
  
          if(this.is_update){
            this.getSpecific();
          }
        }
      }
  }
  </script>
  