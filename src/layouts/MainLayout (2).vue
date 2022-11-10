<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar>
        <q-toolbar-title>
          <img alt="icon" src="~assets/images/asc-logo.jpg" class="navbar-logo" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <footer class="footer bg-white q-pa-md w-100">
      <div class="row">
        <div class="col-md-9">
          <div class="footer-links">
            <a href="#">Terms and Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Inquiry</a>
          </div>
        </div>
        <div class="col-md-3">
          <b>
            Ad Standards Council - Screening System -v 2.0
            <br />
            &copy; 2022. Ad Standards Council
          </b>
        </div>
      </div>
    </footer>
  </q-layout>
</template>

<script>

  const linksData = [
    {
      title: 'Github',
      caption: 'github.com/quasarframework',
      icon: 'code',
      link: 'https://github.com/quasarframework'
    },
    {
      title: 'Discord Chat Channel',
      caption: 'chat.quasar.dev',
      icon: 'chat',
      link: 'https://chat.quasar.dev'
    },
    {
      title: 'Forum',
      caption: 'forum.quasar.dev',
      icon: 'record_voice_over',
      link: 'https://forum.quasar.dev'
    },
    {
      title: 'Twitter',
      caption: '@quasarframework',
      icon: 'rss_feed',
      link: 'https://twitter.quasar.dev'
    },
    {
      title: 'Facebook',
      caption: '@QuasarFramework',
      icon: 'public',
      link: 'https://facebook.quasar.dev'
    },
    {
      title: 'Quasar Awesome',
      caption: 'Community Quasar projects',
      icon: 'favorite',
      link: 'https://awesome.quasar.dev'
    }
  ]

  export default {
    name: 'MainLayout',
    components: {
    },
    data() {
      return {
        leftDrawerOpen: true,
      }
    }
  }
</script>
