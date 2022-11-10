<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Company" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/company/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 'company-lists'" />
        <q-btn label="Company Lists" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/company/lists" icon="lists" color="primary" id="addAscUser" v-if="route_name == 'company-add'" />
        <div class="text-h6 page-title text-dark"><q-icon name="apartment" /> Company</div>
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
