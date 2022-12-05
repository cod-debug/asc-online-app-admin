<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Type of Execution" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/medium-executions-controller/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 'medium-execution-lists'" />
        <q-btn label="Type of Execution List" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/medium-executions-controller/" icon="lists" color="primary" id="addAscUser" v-if="['medium-execution-add', 'medium-execution-update'].includes(route_name)" />
        <div class="text-h6 page-title text-dark">Medium Execution Controller</div>
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
