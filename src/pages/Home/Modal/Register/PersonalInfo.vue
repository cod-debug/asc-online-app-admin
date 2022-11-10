<template>
  <q-card :square="true" elevated :bordered="true" class="q-my-md">
    <q-card-section>
      <div class="text-h6 q-mb-md"><q-icon name="label_important" class="text-red-15" /> Personal Information:</div>
        <q-form @submit.prevent="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                ref="personal_info_form"
                :greedy="true">
          <div class="row">
            <div class="col-md-6 col-lg-6 q-pa-sm">
              <q-input outlined label="Given Name *"
                       v-model="fname"
                       :rules="[val => !!val || 'Field is required']" />
            </div>
            <div class="col-md-6 col-lg-6 q-pa-sm">
              <q-input outlined label="Middle Name" v-model="mname"  />
            </div>
            <div class="col-md-6 col-lg-6 q-pa-sm">
              <q-input outlined label="Last Name *"
                       v-model="lname" 
                       :rules="[val => !!val || 'Field is required']" />
            </div>
            <div class="col-md-6 col-lg-6 q-pa-sm">
              <q-input outlined label="Mobile Number *"
                       v-model="phone"
                       mask="0###########"
                       hint="09##########"
                       :rules="[val => !!val || 'Field is required']" />
            </div>
          </div>
        </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
  export default {

    props: {
      default_val: Object,
    },

    data: () => ({
      fname: "",
      mname: "",
      lname: "",
      phone: null,
    }),
    mounted() {
      console.log(this.default_val, "Personal Info.")
      this.initApp();
    },

    methods: {
      initApp() {
        for (let column in this.default_val) {
          this[column] = this.default_val[column];
        }
      },

      async onSubmit(evt) {
        return await this.$refs.personal_info_form.validate();
      },

      onReset() {

      }
    }

  }
</script>
