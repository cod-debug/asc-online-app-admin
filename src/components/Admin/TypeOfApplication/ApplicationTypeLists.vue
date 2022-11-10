<template>
  <div>

    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      <q-table :columns="columns" flat bordered :rows="table_data" hide-bottom>

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
        { name: 'description', align: 'left', label: 'Description', field: 'desc', sortable: true },
        { name: 'clearing_releasing_time', align: 'left', label: 'Clearing Releasing Time', field: 'cleartime', sortable: true, },
        { name: 'decision_releasing_time', align: 'left', label: 'Decision Releasing Time', field: 'decitime', sortable: true, },
        { name: 'submission_start_time', align: 'left', label: 'Submission Start Time', field: 'starttime', sortable: true, },
        { name: 'submission_end_time', align: 'left', label: 'Submission End Time', field: 'endtime', sortable: true, },
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
          page: this.current,
          size: vm.size,
          order: "id:desc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("type_of_application/getTypeOfApplication", payload);
        if ([200, 201].includes(status)) {
          vm.table_data = data.rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }

      },
      closeModal() {

      }
    }
  }

</script>
