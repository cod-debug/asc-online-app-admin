<template>
  <div>

    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      <q-table :columns="columns" 
      
      bordered 

      :rows="table_data" 
      row-key="id" 
      hide-bottom 
      @row-click="viewDetails" >
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
    name: "member_affiliation_list",

    data: () => ({
      columns: [
        { name: 'compName', align: 'left', label: 'Company', field: 'compName', sortable: false },
        { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: false },
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
          order: "compId:asc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("company_penalties/get", payload);
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
        this.$router.push({name: 'company-penalty-update', params: {
          id: row.id
        }});
      },
      parseStatus(s) {
        switch (s) {
          case "Inactive":
            return {val: 'inactive', color: 'grey'}
            break;
          case "Active":
            return { val: 'active', color: 'green'}
            break;
        }
      },
      closeModal() {

      }
    }
  }

</script>
