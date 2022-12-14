<template>
  <div class="q-pa-md q-ml-lg">
    <appLoading v-if="is_loading" title="Logging in"/>
    <div class="row q-mb-lg">
      <div class="col-12 col-md-8">
        <app-carousel />
      </div>
      <div class="col-12 col-md-4">
        <div class="flex-items-center">
          <div class="bg-white login-form">
            <div class="login-form-header text-center">
              <img src="~assets/images/asc-logo.jpg" style="width: 15em;" />
              <h5 class="q-ma-sm"><b>Login</b></h5>
            </div>

            <div class="q-form q-mr-sm q-ml-sm q-pa-md">
              <div class="q-gutter-md">
                <q-input v-model="email_address" label="Email Address" type="email" />
                <q-input bottom-slots v-model="password" :type="!showPass ? 'password' : 'text-pass'" label="Password">
                  <template v-slot:append>
                    <q-btn round dense flat :icon="!showPass ? 'visibility ' : 'visibility_off'" @click="showHidePassword" />
                  </template>
                </q-input>
              </div>

              <div class="row q-mt-lg">
                <div class="col-sm-6 q-pa-sm">
                  <q-btn color="primary" label="Login" @click="login" class="btn-block" />
                </div>
                <div class="col-sm-6 q-pa-sm">
                  <q-btn color="primary" label="Register" outline class="btn-block" @click="openRegisterModal()" />
                </div>
              </div>
              <div class="text-center">
                <a href="#" class="forgot-password-btn">
                  <small>Forgot Password</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modals">
      <app-register-modal v-if="show_register_modal" :closeModal="closeModal" />
    </div>
  </div>
</template>

<script>
  import appCarousel from "components/HomeCarousel.vue";
  import appRegisterModal from "pages/Home/Modal/Register/RegisterModal.vue";
  import appLoading from "components/LoadingPage.vue";
  import { LocalStorage, Notify, QSpinnerBox } from "quasar";

export default {
    name: 'PageIndex',
    data: () => ({
      showPass: false,
      password: "",
      email_address: "",
      show_register_modal: false,
      is_loading: false,
    }),

    components: {
      appCarousel,
      appRegisterModal,
      appLoading,
    },
    mounted() {
      this.initAppp();
    },
    methods: {
      showHidePassword() {
        this.showPass = !this.showPass;
      },
      initAppp() {
        // this.$store.dispatch("auth/getAllEmployees");
      },
      async login() {
        let payload = {
          email: this.email_address,
          passwd: this.password
        }
        this.is_loading = true;

        try {
          let { data, status } = await this.$store.dispatch('auth/login', payload);
          if ([200, 201].includes(status)) {
            localStorage.setItem('token', data.token);
            // localStorage.setItem('user_email', data.email);
            // localStorage.setItem('is_logged', '1');
            LocalStorage.set('token', data.token);
            LocalStorage.set('user_email', data.email);
            LocalStorage.set('is_logged', '1');
            
            let payload = {
              'Authorization': `Bearer ${data.token}`
            }

            let res = await this.$store.dispatch("users/getCurrentUser", payload);
            let current_user = res.data.id;

            if(data.type == 'evaltr'){
              window.location.href = process.env.EVAL_FE_BASE_URL + "/redirect/?token=" + data.token + "&id=" + current_user;
              return false;
            } else if (data.type == 'adspe') {
              // ADSPE UI
              window.location.href = process.env.ADSPE_FE_BASE_URL + "/redirect/?token=" + data.token + "&id=" + current_user;
              return false;
            } else if (data.type == 'scrner') {
              // ADSPE UI
              window.location.href = process.env.SCRNER_FE_BASE_URL + "/redirect/?token=" + data.token + "&id=" + current_user;
              return false;
            } else if (data.type == 'revwer') {
              // ADSPE UI
              window.location.href = process.env.REVWER_FE_BASE_URL + "/redirect/?token=" + data.token + "&id=" + current_user;
              return false;
            } else if (data.type == 'applcnt') {
              // APPLICANT UI
              window.location.href = process.env.APPLCNT_BASE_URL + "/#/asc/page/announcement?token=" + data.token + "&id=" + current_user;
              return false;
            } else if (data.type == 'accnt') {
              // ACCOUNTING UI
              window.location.href = process.env.ACCOUNTING_BASE_URL + "/#/asc/page/announcement?token=" + data.token + "&id=" + current_user;
              return false;
            }

            // :4220/#/asc/page/application/s1/individual?token=<token>
            //this.$router.push('/asc/page/');
            window.location.href='/asc/page/announcement';
          } else {
            this.$q.dialog({
              message: data.message,
              title: 'Access Denied!',
              progress: false,
              color: "red-14",
              ok: true,
            });
          }
        } catch (e) {
          console.log(e);
          this.$q.dialog({
            message: `Something went wrong`,
            title: 'Access Denied!',
            progress: false,
            ok: true,
          });
        }

        this.is_loading = false;
      },
      openRegisterModal() {
        this.show_register_modal = true;
        this.$nextTick(() => {
          let body = document.getElementsByTagName("body")[0];
          // so that the background image will not b removed.
          body.classList.remove("q-body--prevent-scroll");
        })
      },
      closeModal() {
        this.show_register_modal = false;
      }
    }
}
</script>
