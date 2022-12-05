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
        { name: 'screener_name', align: 'left', label: 'Screener Name', field: 'screenuser', sortable: false },
        { name: 'reviewer_name', align: 'left', label: 'Reviewer Name', field: 'reviewpair', sortable: false },
        // { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: false },
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
          order: "screenerId:asc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("screener_reviewer_pair/get", payload);
        if ([200, 201].includes(status)) {
          console.log(data.rows);
          let parsed_rows = data.rows.map((item) => {
            let parsed = {
              ...item
            }
            for(let column in item) {
              if (column == 'status') {
                parsed[column] = item[column] ? "Active" : "Inactive";
              }
            }
          
            parsed.medium_name = item.mediumtype?.desc || null;
            parsed.execution_name = item.executiontype?.type || null;

            return parsed;
          });
          
          vm.table_data = parsed_rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }

      },
      
      viewDetails (evt, row) {
        this.$router.push({name: 'srp-update', params: {
          id: row.id
        }});
      },
      closeModal() {

      }
    }
  }

</script>
