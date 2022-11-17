<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Brand" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/brands/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 'brand-lists'" />
        <q-btn label="Brand List" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/brands/" icon="lists" color="primary" id="addAscUser" v-if="['brand-add', 'brand-update'].includes(route_name)" />
        <div class="text-h6 page-title text-dark"><q-icon name="file_present" /> Brand</div>
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
