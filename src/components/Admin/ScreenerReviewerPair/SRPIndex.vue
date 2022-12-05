<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Screener - Reviewer Pair" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/screener-reviewer-pairs/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 'srp-lists'" />
        <q-btn label="Screener - Reviewer Pair List" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/screener-reviewer-pairs/" icon="lists" color="primary" id="addAscUser" v-if="['srp-add', 'srp-update'].includes(route_name)" />
        <div class="text-h6 page-title text-dark">Screener-Reviewer Pair</div>
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
