<template>
  <div class="fullscreen q-pa-md bg-grey-5">
    <div class="row q-pa-lg q-ma-lg shadown-6">
      <div class="col-4 offset-md-4 bg-white q-pa-lg">
        <div class="row">
          <div class="col-6 text-center">
            <div>
              <q-img src="~assets/telcom-logo.png" style="width: 100px"></q-img>
            </div>
          </div>
          <div class="col-6">
            <div class="text-h5 text-left q-pt-lg text-black">L O G I N</div>
            <div class="text-caption text-left text-orange-4">
              ADMINISTRATOR LOGIN
            </div>
          </div>
        </div>

        <div class="col-12 q-pa-lg">
          <div class="col-2" />
          <div class="col-8 q-pa-lg">
            <q-input
              bottom-slots
              filled
              dense
              v-model="loginForm.email"
              label="Username / Email"
              required
            >
              <template v-slot:prepend>
                <q-icon name="alternate_email" />
              </template>
              <template v-slot:hint>
                <span class="float-right text-red">{{ userError }}</span>
              </template>
            </q-input>
            <q-input
              bottom-slots
              v-model="loginForm.password"
              filled
              dense
              type="password"
              label="Password "
              required
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>

              <template v-slot:hint>
                <span class="float-right text-red">{{ passError }}</span>
              </template>
            </q-input>
            <div class="q-gutter-sm text-center q-mt-lg">
              <VueRecaptcha sitekey="asd" />
              <div class="text-caption text-center">
                <a href=""> Forgot password? </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 q-px-lg q-mb-lg">
          <div class="col-2"></div>
          <div class="col-4 q-px-lg">
            <q-btn
              @click="login"
              class="full-width text-orange-4"
              color="black"
              label="Log In"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
  import { mapActions } from "vuex";
  import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "AdminLogin",
  mounted() {
    if (this.$store.getters["auth/getToken"]) {
      this.$router.push("/");
    }
    },
    components: {
      VueRecaptcha
    },
  data() {
    return {
      rememberme: false,
    };
  },
  methods: {
    initApp() {

    }
  },
};
</script>
