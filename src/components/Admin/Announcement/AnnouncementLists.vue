<template>
  <div>

    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      <q-table :columns="columns" flat bordered :rows="table_data" hide-bottom @row-click="viewDetails">
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="parseStatus(props.row.status).color">{{parseStatus(props.row.status).val}}</q-badge>
          </q-td>
        </template>
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
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
        // { name: 'details', align: 'left', label: 'Details', field: 'details', sortable: true, },
        { name: 'number_of_views', align: 'left', label: 'Number of Views', field: 'vcount', sortable: true, },
        { name: 'posting_date', align: 'left', label: 'Posting Date', field: 'pdate', sortable: true, },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true, },
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
          this.getAllAnnouncements();
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
        this.getAllAnnouncements();
      },

      async getAllAnnouncements() {
        let vm = this;

        let payload = {
          page: this.current,
          size: vm.size,
          order: "id:desc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await this.$store.dispatch("announcements/getAllAnnouncements", payload);
        if ([200, 201].includes(status)) {
          vm.table_data = data.rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
          vm.loading_list = false;
        }

      },
      
      viewDetails (evt, row) {
        this.$router.push({name: 'announcement-update', params: {
          id: row.id
        }});
      },
      parseStatus(s) {
        switch (s) {
          case 0:
            return {val: 'inactive', color: 'grey'}
            break;
          case 1:
            return { val: 'active', color: 'green'}
            break;
        }
      },

      closeModal() {

      }
    }
  }

</script>
