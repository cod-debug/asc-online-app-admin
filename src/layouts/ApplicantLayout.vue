<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
      <q-header flat class="bg-white border-bottom-red text-dark q-pa-md">
        <div class="row">
          <div class="col-sm-3">
            <q-toolbar>
              <!--<q-btn flat @click="drawer = !drawer" round icon="menu" />-->
              <img alt="icon" src="~assets/images/asc-logo.jpg" class="navbar-logo" style="height: 5em" />
            </q-toolbar>
          </div>
          <div class="col-sm-6">
            <div class="text-center">
              <h3 class="time-container">{{currentTime}}</h3>
              <b>{{todayFormatted}}</b>
            </div>
          </div>
          <div class="col-sm-3">

          </div>
        </div>

      </q-header>

      <Drawer />



      <q-page-container style="background: #dfdfdf;">
        <router-view />
      </q-page-container>
      <footer class="admin-footer text-white" >
        <p>
          Ad Standards Council - Screening System - v2.0
          <br />
          © 2022. Ad Standards Council
        </p>
      </footer>
    </q-layout>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { date } from 'quasar'
  import Drawer from "components/LayoutComponents/Drawer/DrawerIndex.vue";

  const miniState = ref(false)

  export default {
    data: () => ({
      currentTime: "",
      todayFormated: "",
    }),
    watch: {
    },

    computed: {
      todayFormatted() {
        let currentDate = new Date();
        return date.formatDate(currentDate,'dddd, MMMM D, YYYY');
      }
    },
    components: {
      Drawer
    },
    mounted() {
      let vm = this;
      vm.getCurrentDateTime();

      setInterval(() => {
        vm.getCurrentDateTime();
      }, 1000);
    },
    methods: {
      getCurrentDateTime() {
        let currentdate = new Date();
        let hours = currentdate.getHours() > 12 ? currentdate.getHours() - 12 : currentdate.getHours();
        hours = hours < 10 ? '0' + hours : hours;
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
