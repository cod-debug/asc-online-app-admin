<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <div class="text-h6"><q-icon name="announcement" /> Announcements</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <b class="text-italic text-grey-7">No announcements.</b>
      </q-card-section>


      <q-separator inset />

      <q-card-section>

      </q-card-section>

    </q-card>
  </div>
</template>

<script>

export default {
    name: 'AdminAnnouncements',
    data: () => ({
    }),

    components: {
    },
    methods: {
      showHidePassword() {
      }
    }
}</script>
