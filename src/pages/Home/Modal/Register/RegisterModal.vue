<template>
  <div class="q-gutter-sm">
    <q-dialog v-model="icon" :persistent="true">
      <q-card style="width: 1000px; max-width: 80vw;" class="q-py-md">

        <q-card-section class="row items-center q-pb-none">
          <div>
            <div class="text-h6 text-red-15 text-bold">Account Registration</div>
            <small class="text-red-14">
              <q-icon class="text-h5" name="error_outline"></q-icon>
              <i> All fields with * are required, <span class="text-dark">Please provide all required details to register.</span></i>
            </small>
          </div>

          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="closeModal" />
        </q-card-section>
        <div class="q-pa-md">
          <q-stepper v-model="step"
                     ref="stepper"
                     color="negative"
                     active-color="green"
                     done-color="negative"
                     done-icon="edit"
                     animated>
            <q-step :name="1"
                    title="Privacy Notice"
                    active-icon="fa fa-1"
                    :done="step > 1">
              <app-terms-tab ref="terms" />
              <div class="form-group">
                <input type="checkbox" v-model="agree_to_terms" id="agree" />
                <label for="agree"> Accept Terms and Agreement</label>
              </div>
            </q-step>

            <q-step :name="2"
                    title="Personal Information"
                    icon="fa fa-2"
                    active-icon="fa fa-2"
                    :done="step > 2">
              <app-personal-info-tab ref="personal_info" :default_val="personal_info" />
            </q-step>

            <q-step :name="3"
                    title="Company Information"
                    icon="fa fa-3"
                    active-icon="fa fa-3"
                    :done="step > 3">
              <app-company-info-tab ref="company_info" :default_val="company_info" />
            </q-step>

            <q-step :name="4"
                    title="Account Information"
                    icon="fa fa-4"
                    active-icon="fa fa-4"
                    done-color="negative">
              <app-account-info-tab ref="account_info" :default_val="account_info" />

            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <vue-recaptcha ref="recaptcha" @verify="markRecaptchaAsVerified" sitekey="6LcYqMAhAAAAABPJ7Q3Tw-IPZ6lXh7pD8Q5uR1rC" v-if="step == 4" class="q-mb-lg" />
                <q-btn v-if="step > 1" elevated @click="$refs.stepper.previous()" label="Back" class="q-mr-sm" />
                <q-btn @click="next()" color="primary" :label="step === 4 ? 'Submit' : 'Next'" v-if="agree_to_terms" />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { Notify } from "quasar";

  import TermsTab from "./TermsTab.vue";
  import PersonalInfoTab from "./PersonalInfo.vue";
  import CompanyInfoTab from "./CompanyInfo.vue";
  import AccountInfoTab from "./AccountInfo.vue";
  import { VueRecaptcha } from "vue-recaptcha"
  
  export default {
    props: ['closeModal'],
    data: () => ({
      icon: true,
      active_tab: "UserDetails",
      tab: "user",
      recaptchaVerified: false,
      agree_to_terms: false,
      tab_list: [
      ],

      personal_info: {
        fname: "",
        mname: "",  
        lname: "",
        phone: "",
      },

      company_info: {
        compID: "",
        member_affiliation: "",
      },

      account_info: {
        email: "",
        passwd: "",
        confirm_password: "",
      },

      step: ref(1),
    }),
    computed: {
    },
    methods: {
      invalidForm() {
        Notify.create({
          message: 'Validation error. Kindly check all fields!',
          position: 'top-right',
          closeBtn: "X",
          timeout: 3000,
        })
      },

      markRecaptchaAsVerified(response) {
        this.recaptchaVerified = true;
      },
      checkIfRecaptchaVerified() {
        if (!this.loginForm.recaptchaVerified) {
          this.loginForm.pleaseTickRecaptchaMessage = 'Please tick recaptcha.';
          return true; // prevent form from submitting
        }
        alert('form would be posted!');
      },

      async next() {
        let is_valid = false;
        switch (this.step) {
          case 2:
            let personal_info = this.$refs.personal_info;
            console.log(this.$refs.personal_info);
            is_valid = await personal_info.onSubmit();
            if (!is_valid) {
              this.invalidForm();
              return false
            }
            
            for (let column in this.personal_info) {
              this.personal_info[column] = personal_info[column];
            }

            break;
          case 3:
            let company_info = this.$refs.company_info;

            is_valid = await company_info.onSubmit();
            if (!is_valid) {
              this.invalidForm();
              return false
            }

            for (let column in this.company_info) {
              this.company_info[column] = company_info[column];
            }
            break;
          case 4:
            let account_info = this.$refs.account_info;

            is_valid = await account_info.onSubmit();
            if (!is_valid) {
              this.invalidForm();
              return false
            }

            for (let column in this.account_info) {
              this.account_info[column] = account_info[column];
            }

            if (!this.recaptchaVerified) {
              Notify.create({
                message: 'Validation error. Recaptcha is not verified!',
                position: 'center',
                closeBtn: "X",
                timeout: 3000,
              })
              return false;
            }

            this.submit();
            break;
        }
        this.$refs.stepper.next()
      },

      async submit() {
        let payload = { ...this.personal_info, ...this.company_info, ...this.account_info, compID: this.company_info.compID.value };
        delete payload['confirm_password'];
        delete payload['member_affiliation'];

        let { data, status } = await this.$store.dispatch("auth/registerApplicant", payload);

        if ([200, 201].includes(status)) {
          Notify.create({
            message: 'Successfully registered. Wait for admin approval. Thanks!',
            position: 'top-right',
            closeBtn: "X",
            timeout: 3000,
          })

          this.closeModal();
        } else {
          Notify.create({
            message: data.message,
            position: 'center',
            closeBtn: "X",
            color: "red",
            timeout: 3000,
          })
        }

      }
    },
    components: {
      appTermsTab: TermsTab,
      appPersonalInfoTab: PersonalInfoTab,
      appCompanyInfoTab: CompanyInfoTab,
      appAccountInfoTab: AccountInfoTab,
      VueRecaptcha: VueRecaptcha
    },
    mounted() {

    }
}
</script>
