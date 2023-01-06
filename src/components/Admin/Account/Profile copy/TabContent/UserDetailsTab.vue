<template>
  <q-card-section>
    <q-form ref="form" @validation-error="onValidationError" greedy>
      <q-card
        flat
        bordered
        class="fields-card"
        style="margin-bottom: 1rem"
      >
        <q-card-section>
          <div class="text-h6" style="display: flex">
            <i
              class="fa-solid fa-tags"
              style="color: #a00000"
            ></i>
            <!-- <q-icon name="label_important" style="color: #a00000"></q-icon> -->
            <span class="card-header">Personal Information</span>
          </div>

          <q-separator style="margin-bottom: 1.5rem" />

          <div class="row q-col-gutter-md">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Given name"
                v-model="info.fname"
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Middle name"
                v-model="info.mname"
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Last name"
                v-model="info.lname"
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Mobile number"
                v-model="info.phone"
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
          </div>
        </q-card-section>

      </q-card>
    </q-form>
  </q-card-section>
</template>
<script>
export default {
  props: ['allow_action', 'user_details'],
  data: () => ({
    info: {
      fname: null,
      mname: null,
      lname: null,
      phone: null,
    }
  }),

  watch: { },

  methods: {
    async init_app() {
      this.reset_details();
    },

    reset_details() {
      let details = this.user_details;
      this.info.fname = details?.fname || null;
      this.info.mname = details?.mname || null;
      this.info.lname = details?.lname || null;
      this.info.phone = details?.phone || null;
    },

    onValidationError(ref) {
      // console.log('onValidationError', ref)
    },

    on_submit_update(callback) {
      this.$refs.form.validate().then((success) => {
        if (success) {
          callback(this.info)
        }
        else {
          this.$q.notify({
            message: 'Form validaton failed. Please double check your data.',
            icon: 'report_problem',
            timeout: 3000,
            position: "top-right",
            color: "negative",
            multiLine: true,
            actions: [
              { label: 'Dismiss', color: 'white', handler: () => {} }
            ]
          })
        }
      })
    }
  },

  mounted() {
    this.$emit('update:allow_action', true);
    this.init_app();
  }
}
</script>

<style lang="scss" scoped>
.fields-card {
  border: 1px solid #d8d8d8;
  border-radius: 0;
  box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 10%) !important;
  -webkit-box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 10%) !important;
  -moz-box-shadow: 5px 4px 5px 1px rgba(0, 0, 0, 0.1) !important;

  .card-header {
    font: 400 15px/24px Roboto, Helvetica Neue, sans-serif;
    letter-spacing: normal;
    margin: 0 0 16px;
    padding-left: 10px;
  }
  .card-sub-header {
    padding-left: 0;
    font-weight: 500;
    font: 400 15px/24px Roboto, Helvetica Neue, sans-serif;
    letter-spacing: normal;
    margin: 0 0 16px;
  }
}

</style>
