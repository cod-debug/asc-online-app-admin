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
                     :rules="[
                      val => !!val || 'Field is required', isValidEmail()]" />
          </div>
          <div class="col-md-6 col-lg-6 q-pa-sm">
            <q-input outlined
                     type="password"
                     label="Confirm Password *"
                     v-model="confirm_password"
                     :rules="[val => !!val || 'Field is required', isValidPassword]" />
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
      
      isValidEmail () {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(this.email) || 'Invalid email';
      },
      
      isValidPassword () {
        return this.passwd == this.confirm_password || 'Password does not match.';
      },

      async onSubmit(evt) {
        return await this.$refs.personal_info_form.validate();
      },

      onReset() {

      }
    }

  }</script>
