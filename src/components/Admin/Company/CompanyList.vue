<template>
  <div>
    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>
    <div v-else>
      <q-table :columns="columns"
               flat
               :rows="table_data"
               hide-bottom
              @row-click="viewDetails" >

      </q-table>
      <div class="text-right q-mt-md">

        <q-pagination v-model="current"
                      :max="max"
                      direction-links
                      flat
                      color="grey"
                      active-color="primary" />
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "member_affiliation_list",

    data: () => ({
      columns: [
        { name: 'company_name', align: 'left', label: 'Company Name', field: 'name', sortable: true },
        { name: 'member_affiliation', align: 'left', label: 'Member Affiliation', field: 'member_affiliation', sortable: true, },
        { name: 'telephone', align: 'left', label: 'Telephone Number', field: 'telephone', sortable: true, },
        { name: 'tin', align: 'left', label: 'TIN', field: 'tin', sortable: true, },
        { name: 'country', align: 'left', label: 'Country', field: 'country', sortable: true, },
        { name: 'address', align: 'left', label: 'Address', field: 'address', sortable: true, },
        { name: 'delinquent', align: 'left', label: 'Delinquent', field: 'delinquent', sortable: true, },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true, },
      ],

      table_data: [],
      current: 1,
      max: 0,
      size: 5,
      loading_list: true,
    }),

    components: {

    },

    mounted() {
      this.initApp();
    },

    watch: {
      current(newVal) {
        if (newVal) {
          this.initApp();
        }
      }
    },

    methods: {
     async initApp() {
        let vm = this;
        vm.loading_list = true;
        let payload = {
          page: this.current,
          size: vm.size,
          order: "name:asc",
          search: "",
        }

        let { data, status } = await vm.$store.dispatch('company/getAllCompanies', payload);
        if ([200, 201].includes(status)) {
          vm.table_data = data.rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
        }

        vm.loading_list = false;
      },
      
      viewDetails (evt, row) {
        this.$router.push({name: 'company-update', params: {
          id: row.id
        }});
      },

      closeModal() {

      }
    }
  }

</script>
