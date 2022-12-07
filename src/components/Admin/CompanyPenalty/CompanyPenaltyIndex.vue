<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Company Penalty" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/company-penalties/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 'company-penalty-lists'" />
        <q-btn label="Brand Company List" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/company-penalties" icon="lists" color="primary" id="addAscUser" v-if="['company-penalty-add', 'company-penalty-update'].includes(route_name)" />
        <div class="text-h6 page-title text-dark"><q-icon name="turned_in" /> Company Penalties</div>
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
