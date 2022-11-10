<template>
  <q-drawer v-model="drawer"
            show-if-above
            elevated
            :mini="!drawer || miniState"
            :width="300"
            :breakpoint="500"
            bordered
            class="bg-grey-3">
    <q-btn class="nav-toggler text-white" type="button" icon="menu" unelevated @click.prevent="drawerClick"></q-btn>
    <q-scroll-area class="fit text-red-14 text-bold">
      <q-list padding>
        <div class="text-center" v-if="!miniState">
          <h6 class="q-ma-none text-dark">{{ userRole }}</h6>
          <hr class="nav-hr" />
        </div>

        <AdminDrawer v-if="userRole === userRoles[0]" />
        <ApplicantDrawer v-else-if="userRole === userRoles[1]" />

        <div>
          <hr class="nav-hr" />
          <q-item clickable v-ripple class="nav-item">
            <q-item-section avatar>
              <i class="fa-solid fa-power-off"></i>
            </q-item-section>

            <q-item-section class="text-red-15">
              Log out
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-scroll-area>

    <!--
      in this case, we use a button (can be anything)
      so that user can switch back
      to mini-mode
    -->
    <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
      <q-btn dense
             round
             unelevated
             color="accent"
             icon="chevron_left"
             @click="miniState = true" />
    </div>
  </q-drawer>
</template>

<script>
  import ApplicantDrawer from "../Applicant/DrawerItems";
  import AdminDrawer from "../Admin/DrawerItems";
  import { ref } from 'vue'

  const miniState = ref(false)

  export default {
    components: {
      ApplicantDrawer,
      AdminDrawer
    },
    data: () => ({
      currentTime: "",
      miniState: miniState,

      // Temporary Variable (Remove later)
      userRoles: [
        "Admin",
        "Applicant",
      ],
      userRole: "Admin"

    }),
    watch: {
    },

    computed: {
    },

    mounted() {
      let vm = this;
      vm.getCurrentDateTime();

      setInterval(() => {
        vm.getCurrentDateTime();
      }, 1000);
    },
    methods: {
      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (this.miniState) {
          this.miniState = false
          e.stopPropagation()
        } else {
          this.miniState = true
          e.stopPropagation()
        }
      },
      getCurrentDateTime() {
        let currentdate = new Date();
        let hours = currentdate.getHours() > 12 ? currentdate.getHours() - 12 : currentdate.getHours();
        hours = hours <= 10 ? '0' + hours : hours;
        let ampm = currentdate.getHours() > 12 ? "PM" : "AM";

        this.currentTime = `${hours}:${currentdate.getMinutes()}:${currentdate.getSeconds() < 10 ? '0'+currentdate.getSeconds(): currentdate.getSeconds()} ${ampm}`;
      },
      getToday() {
        let currentdate = new Date();

      }
    },

    setup() {
      return {
        drawer: ref(false),
      }
    }
  }
</script>
