<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="icon" :persistent="true">
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add ASC User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="closeModal" />
        </q-card-section>

        <q-card-section>
          <q-card-section>
            <q-tabs v-model="tab"
                    dense
                    align="left"
                    class="text-dark"
                    indicator-color="blue"
                    :no-caps="true">
              <q-tab name="user" label="User Details" @click="active_tab = 'UserDetails'" />
              <q-tab name="account" label="Account Information" @click="active_tab = 'AccountInfo'" />
            </q-tabs>
            <hr class="q-tabs-gutter" color="lightgray" />

            <q-card :square="true" flat :bordered="true" class="q-my-md">
              <q-card-section v-if="active_tab == 'UserDetails'">
                <div class="text-h6 q-mb-md"><q-icon name="label_important" class="text-red-15" /> Personal Information:</div>
                <div class="form row">
                  <div class="col-md-6 q-pa-md">
                    <q-input outlined label="Given Name" v-model="fname" />
                  </div>
                  <div class="col-md-6 q-pa-md">
                    <q-input outlined label="Middle Name" v-model="mname" />
                  </div>
                  <div class="col-md-6 q-pa-md">
                    <q-input outlined label="Last Name" v-model="lname" />
                  </div>
                  <div class="col-md-6 q-pa-md">
                    <q-input outlined label="Mobile Number" v-model="mobile_num" />
                  </div>
                  <div class="col-md-6 q-pa-md">
                    <q-input outlined label="User Role" v-model="user_role" />
                  </div>
                </div>
              </q-card-section>

              <q-card-section v-else-if="active_tab == 'AccountInfo'">
                <div class="text-h6 q-mb-md"><q-icon name="label_important" class="text-red-15" /> Account Information:</div>
                <div class="form row">
                  <div class="col-md-12 q-pa-md">
                    <q-input outlined label="Email Address" v-model="email_address" />
                  </div>
                  <div class="col-md-6 q-pa-md">
                    <q-input outlined label="Password" v-model="password" />
                  </div>
                  <div class="col-md-6 q-pa-md">
                    <q-input outlined label="Confirm Password" v-model="confirm_password" />
                  </div>
                </div>
              </q-card-section>

            </q-card>

            <strong v-if="active_tab == 'UserDetails'"><q-icon name="error_outline" /> Note: Proceed to Account Information to complete adding of ASC user.</strong>

            <q-btn class="bg-blue-13 text-white" v-if="active_tab == 'AccountInfo'"><q-icon name="offline_pin" /> Save</q-btn>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

  export default {
    props: ['closeModal', 'modal_type', 'selected_item'],
    data: () => ({
      icon: true,

      // USER INFORMATION
      fname: "",
      mname: "",
      lname: "",
      mobile_num: "",
      user_role: "",
      email_address: "",
      password: "",
      confirm_password: "",

      active_tab: "UserDetails",
      tab: "user",
    }),
    mounted() {
      this.initApp();
    },

    methods: {
      initApp() {
        if (this.modal_type === 'approval') {
          for (let column in this.selected_item) {
            this[column] = this.selected_item[column];
          }
        }
      }
    }
}
</script>
