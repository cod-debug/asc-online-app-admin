<template>
  <div class="fullscreen q-pa-md bg-grey-5">
    <div class="row q-pa-lg q-ma-lg shadown-6">
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
const { LocalStorage, Notify } = require("quasar");

export default {
  name: "AdminRedirect",
  mounted() {
    this.acceptRedirect();
  },
  data() {
    return {
      rememberme: false,
      registerForm: {
        reg_opt: "",
        email: "",
        pass: "",
        cpass: "",
        fname: "",
        mname: "",
        lname: "",
      },
      loginForm: {
        email: "",
        password: "",
      },

      userError: "",
      passError: "",

      reg_emailError: "",
      reg_mnameError: "",
      reg_fnameError: "",
      reg_lnameError: "",
      reg_passError: "",
      reg_cpassError: "",
      reg_optError: "",
      tab: "loginTab",
      options: [
        {
          value: "doctor",
          label: "Doctors",
        },
        {
          value: "employee",
          label: "Employee",
        },
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["userAuthentication"]),
    changeTab() {
      this.tab = "registerTab";
    },

    toLogTab() {
      this.tab = "loginTab";
    },

    async acceptRedirect() {
      let token = this.$router.currentRoute._value.query.token;
      let role = this.$router.currentRoute._value.query.role;
      let email = this.$router.currentRoute._value.query.email;

      if (role != 'superadmin') {
        this.$q.notify({
          type: "negative",
          message: `Error  not a valid user`,
        });
        return false;
      }

      // should have a token checker first before proceed. need to coordinate with BE

      let loginDetails = {
        user_role: role,
        email: email,
      }

      LocalStorage.set("accessToken", token);
      LocalStorage.set("userDetails", loginDetails);
      console.log(this.$store, "STORE!");

      this.$store.state.token = token;
      this.$store.state.userDetails = loginDetails;
      this.$router.push("/");
    },
    async login() {
      !this.loginForm.email
        ? (this.userError = "Email is required!")
        : (this.userError = "");
      !this.loginForm.password
        ? (this.passError = "Password is required!")
        : (this.passError = "");

      if (this.loginForm.password && this.loginForm.email) {
        this.userAuthentication({
          email: this.loginForm.email,
          password: this.loginForm.password,
        })
          .catch((err) => {
            this.$q.notify({
              type: "negative",
              message: `Error  ( ${err.message} ) `,
            });
          })
          .then((User) => {
            console.log(User);
            this.$router.push("/");
          });
      }
    },
    emptyform(form) {
      if (form == "register") {
        this.registerForm = {
          reg_opt: "",
          email: "",
          pass: "",
          cpass: "",
          fname: "",
          mname: "",
          lname: "",
        };
      }
      if (form == "login") {
        this.loginForm = {
          email: "",
          pass: "",
        };
      }
    },

  },
};
</script>
