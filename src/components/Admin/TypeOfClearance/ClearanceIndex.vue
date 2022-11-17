<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Clearance Type" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/type-of-clearance/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 'clearance-lists'" />
        <q-btn label="Clearance List" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/type-of-clearance" icon="lists" color="primary" id="addAscUser" v-if="['clearance-add', 'clearance-update'].includes(route_name)" />
        <div class="text-h6 page-title text-dark"><q-icon name="file_present" /> Type of Clearance</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <router-view />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  computed: {
      route_name(){
        return this.$route.name;
      }
    }
  }
</script>
