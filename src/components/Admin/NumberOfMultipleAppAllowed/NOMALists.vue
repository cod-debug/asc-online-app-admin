<template>
  <div>

    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      <q-table :columns="columns" flat bordered :rows="table_data" row-key="name" hide-bottom @row-click="viewDetails" >

      </q-table>

      <!-- <div class="text-right q-mt-md">
        <q-pagination v-model="current"
                      :max="max"
                      direction-links
                      flat
                      color="grey"
                      active-color="primary" />
      </div> -->
    </div>
  </div>
</template>


<script>
  export default {
    name: "document_size_list",

    data: () => ({
      columns: [
        { name: 'size', align: 'left', label: 'Document Size', field: 'size', sortable: false },
      ],

      table_data: [],
      current: 1,
      max: 0,
      size: 5,
      loading_list: true,

    }),

    watch: {
      current(newVal) {
        if (newVal) {
          this.getAppType();
        }
      }
    },

    components: {

    },

    mounted() {
      this.initApp();
    },

    methods: {
      initApp() {
        let vm = this;
        this.getAppType();
      },

      async getAppType() {
        let vm = this;

        let payload = {
          id: 1,
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("document_file_size/getSpecific", payload);
        if ([200, 201].includes(status)) {
          let parsed_rows = [{
            size: data.size,
            id: data.id,
          }];

          vm.table_data = parsed_rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }

      },
      
      viewDetails (evt, row) {
        this.$router.push({name: 'document-size-update', params: {
          id: row.id
        }});
      },
      closeModal() {

      }
    }
  }

</script>
