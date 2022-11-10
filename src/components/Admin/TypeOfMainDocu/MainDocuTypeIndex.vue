<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Document Type" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/type-of-main-documents/add" icon="add_circle" color="primary" id="addAscUser" v-if="route_name == 'type-of-main-document-lists'" />
        <q-btn label="Document Type List" elevated class="q-mb-md q-mr-md" size="md" to="/asc/page/maintenance/type-of-main-documents" icon="lists" color="primary" id="addAscUser" v-if="['type-of-main-document-add', 'type-of-main-document-update'].includes(route_name)" />
        <div class="text-h6 page-title text-dark"><q-icon name="file_present" /> Type of Main Document</div>
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
