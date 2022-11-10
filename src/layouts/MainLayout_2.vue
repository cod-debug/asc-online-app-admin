<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">
    <q-header elevated class="text-white bg-black" >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar square  size="40px" class="q-ma-xs">
            <img src="~assets/telcom-logo.png" />
          </q-avatar>
          <strong>Investor Relation Admin</strong>
          <q-item class="float-right q-ma-sm"  clickable dense @click="logout"><q-icon name="logout" /></q-item>
        </q-toolbar-title>

        <!-- <q-btn
          dense
          color="purple-13"
          round
          icon="notifications"
          class="q-mx-md"
        >
          <q-badge color="red" floating>4</q-badge>
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="text-white bg-black">
      <q-list>
        <div class="q-pa-sm ">NAVIGATION</div>
        <!-- <q-img src="~assets/profile-bg.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">
              {{
                User.personal_information
                  ? User.personal_information.firstName
                  : ""
              }}
              {{
                User.personal_information
                  ? User.personal_information.lastName
                  : ""
              }}
            </div>
            <div>
              {{ User.user_name }}
              <div class="text-red float-right">
                <q-item clickable dense @click="logout"> Logout</q-item>
              </div>
            </div>
          </div>
        </q-img> -->

        <q-item
          clickable
          tag="a"
          to="/"
          :active="$router.currentRoute.value.name == 'dashboard'"
          :active-class="
            $router.currentRoute.value.name == 'dashboard'
              ? 'bg-orange-4 text-white'
              : ''
          "
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-expansion-item
          :default-opened="
            $router.currentRoute.value.path == '/profile' ||
            $router.currentRoute.value.path == '/change_password'
          "
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>Personals</q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pa-none" style="text-indent: 25px">
              <q-item
                clickable
                tag="a"
                to="/profile"
                active-class="bg-indigo-8 text-white"
                :active="$router.currentRoute.value.path == '/profile'"
              >
                <q-item-section avatar>
                  <q-icon name="account_box" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>My Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                tag="a"
                to="/change_password"
                active-class="bg-indigo-8 text-white"
                :active="$router.currentRoute.value.path == '/change_password'"
              >
                <q-item-section avatar>
                  <q-icon name="lock_open" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Change Password</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item> -->

        <q-item
          clickable
          tag="a"
          to="/user/accounts"
          active-class="bg-orange-4 text-white"
          :active="$router.currentRoute.value.path == '/user/accounts'"
        >
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>User Accounts</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import { mapActions } from "vuex";
import { LocalStorage } from "quasar";

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },
  data() {
    return {
      leftDrawerOpen: false,
      User: {},
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    ...mapActions("auth", ["signout"]),
    logout() {
      this.signout();
      console.log(this);
      window.location.href = `${process.env.ENROLLMENT_URL}/login`;
    },
  },
  mounted() {
    console.log(this.$router.currentRoute.value, "router");
    console.log(
      this.$router.currentRoute.value.name === "dashboard",
      "fasdasdsad"
    );
    this.User = LocalStorage.getItem("userDetails");
    if (!this.User) {
      this.$router.push("/auth/login");
    }
    console.log(this.User);
  },
});
</script>
