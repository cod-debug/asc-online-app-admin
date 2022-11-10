<template>
  <q-card :square="true" elevated :bordered="true" class="q-my-md">
    <q-card-section>
      <div class="text-h6 q-mb-md"><q-icon name="label_important" class="text-red-15" /> Account Information:</div>
      <q-form @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              ref="personal_info_form"
              :greedy="true">
        <div class="row">
          <div class="col-md-12 col-lg-12 q-pa-sm">
            <q-input outlined
                     label="Email *"
                     v-model="email"
                     type="email"
                     :rules="[val => !!val || 'Field is required']" />
          </div>
          <div class="col-md-6 col-lg-6 q-pa-sm">
            <q-input outlined
                     type="password"
                     label="Password *"
                     v-model="passwd"
                     :rules="[val => !!val || 'Field is required']" />
          </div>
          <div class="col-md-6 col-lg-6 q-pa-sm">
            <q-input outlined
                     type="password"
                     label="Confirm Password *"
                     v-model="confirm_password"
                     :rules="[val => !!val || 'Field is required']" />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>export default {
    data: () => ({
      email: "",
      passwd: "",
      confirm_password: "",
    }),

    props: ['default_val'],

    mounted() {
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

  }</script>
