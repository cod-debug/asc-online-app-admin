<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/s1-s2-expiration-periods/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 's1-s2-expiration-lists'" />
        <q-btn label="List" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/s1-s2-expiration-periods/" icon="lists" color="primary" id="addAscUser" v-if="['s1-s2-expiration-add', 'holiday-update'].includes(route_name)" />
        <div class="text-h6 page-title text-dark">S1 and S2 Form Expiration Period</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <router-view />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>export default {
  computed: {
      route_name(){
        return this.$route.name;
      }
    }
  }</script>
