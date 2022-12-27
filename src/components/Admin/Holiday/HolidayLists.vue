<template>
  <div>

    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      
      <div v-if="table_data.length <= 0" class="no-data-found">
            <q-icon name="warning" /> NO DATA FOUND...
          </div>
      <q-table v-else :columns="columns" flat bordered :rows="table_data" row-key="name" hide-bottom @row-click="viewDetails" >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="parseStatus(props.row.status).color">{{parseStatus(props.row.status).val}}</q-badge>
          </q-td>
        </template>
      </q-table>

      <div class="text-right q-mt-md" v-if="max > 0">
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
    name: "holiday_list",

    data: () => ({
      columns: [
        { name: 'name', align: 'left', label: 'Holiday Name', field: 'name', sortable: false },
        { name: 'date', align: 'left', label: 'Holiday Date', field: 'date', sortable: false },
        { name: 'type', align: 'left', label: 'Holiday Type', field: 'type', sortable: false },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: false },
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
          order: "date:asc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("holiday/get", payload);
        if ([200, 201].includes(status)) {
          vm.table_data = data.rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }
      },
      
      viewDetails (evt, row) {
        this.$router.push({name: 'reason-update', params: {
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
