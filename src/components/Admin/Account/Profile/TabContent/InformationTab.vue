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
            <span class="card-header">Account Information</span>
          </div>

          <!-- <q-separator style="margin-bottom: 1.5rem" /> -->

          <div class="row q-col-gutter-md">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <q-input
                outlined
                standout
                bottom-slots
                label="Email Address"
                v-model="account.email"
                disable
                class="no-pointer"
                type="email"
              />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
              <q-input
                outlined
                standout
                bottom-slots
                label="Old Password"
                v-model="account.old_password"
                :rules="[val => val && val.length > 0 || 'Password is required']"
                class="no-pointer"
                :type="show_old_password ? 'text-pass' : 'password'">
                <template v-slot:append>
                  <q-icon
                    :name="show_old_password ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="show_hide_password('old_password')"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Password"
                v-model="account.password"
                :type="show_password ? 'text-pass' : 'password'"
                :rules="[
                  val => val && val.length > 0 || 'Password is required',
                  val => val && is_8_char_length(val) || 'Password must be at least 8 characters',
                  val => val && has_uppercase(val) || 'Password must be at least 1 uppercase letter',
                  val => val && has_lowercase(val) || 'Password must be at least 1 lowercase letter',
                  val => val && has_number(val) || 'Password must be at least 1 number',
                  val => val && has_special_char(val) || 'Password must be at least 1 special character',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="show_password ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="show_hide_password('password')"
                  />
                </template>
              </q-input>

              <ul class="password-requirements">
                <li
                  :class="`${is_8_char_length(account.password || '') ? 'pass' : 'failed'}`"
                >
                  Password must be at least 8 characters in length
                </li>
                <li
                  :class="`${has_uppercase(account.password || '') ? 'pass' : 'failed'}`"
                >
                  Password must contain a minimum of 1 upper case letter [A-Z]
                </li>
                <li
                :class="`${has_lowercase(account.password || '') ? 'pass' : 'failed'}`"
                >
                  Password must contain a minimum of 1 lower case letter [a-z]
                </li>
                <li
                  :class="`${has_number(account.password || '') ? 'pass' : 'failed'}`"
                >
                  Password must contain a minimum of 1 numeric character [0-9]
                </li>
                <li
                  :class="`${has_special_char(account.password || '') ? 'pass' : 'failed'}`"
                >
                  Password must contain a minimum of 1 special character
                </li>
              </ul>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Confirm Password"
                v-model="account.confirm_password"
                :type="show_confirm_password ? 'text-pass' : 'password'"
                :rules="[
                  val => val === account.password || 'Password not match',
                  val => val && val.length > 0 || 'Password is required'
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="show_confirm_password ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="show_hide_password('confirm_password')"
                  />
                </template>
              </q-input>
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
    show_old_password: false,
    show_password: false,
    show_confirm_password: false,
    account: {
      email: null,
      old_password: null,
      password: null,
      confirm_password: null,
    }
  }),

  watch: {
    'account.password'(new_value) {
      this.match_password();
    },
    'account.confirm_password'(new_value) {
      this.match_password();
    }
  },

  computed: {
    valid_form() {
      return false
    }
  },

  methods: {
    init_app() {
      this.account.email = this.user_details?.email || null;
      this.$emit('update:allow_action', false);
    },

    onValidationError(ref) {
      // console.log('onValidationError', ref)
    },

    on_submit_update(callback) {
      this.$refs.form.validate().then((success) => {
        if (success) {
          callback(this.account)
        }
      })
    },

    is_8_char_length(val) {
      return val && val.length >= 8;
    },

    has_special_char(val) {
      return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val)
    },

    has_number(val) {
      return /[0-9]/.test(val)
    },

    has_uppercase(val) {
      return /[A-Z]/.test(val)
    },

    has_lowercase(val) {
      // console.log('val', val)
      // console.log('val', /[a-z]/.test(val))
      return /[a-z]/.test(val)
    },

    match_password() {
      let password = this.account.password || "";
      let confirm_password = this.account.confirm_password || "";
      console.log('ddd')
      if (password.length <= 0 || confirm_password.length <= 0) return;

      // let valid_1 = this.is_8_char_length(this.password);
      // let valid_2 = this.has_special_char(this.password);
      // let valid_3 = this.has_number(this.password);
      // let valid_4 = this.has_uppercase(this.password);
      // let valid_5 = this.has_lowercase(this.password);

      // if (!valid_1 || !valid_2 || !valid_3 || !valid_4 || !valid_5) return;

      if (password === confirm_password) {
        this.$emit('update:allow_action', true);
      }
      else {
        this.$emit('update:allow_action', false);
      }
    },

    show_hide_password(type) {
      if (type === 'password') {
        this.show_password = !this.show_password;
      }
      else if (type === 'confirm_password') {
        this.show_confirm_password = !this.show_confirm_password;
      } else if (type === 'old_password'){
        this.show_old_password = !this.show_old_password;
      }
    },
  },

  mounted() {
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
.password-requirements {
  li.pass {
    color: #8b8b8b;
  }
  li.failed {
    color: red;
    font-weight: bold;
  }
}
</style>
