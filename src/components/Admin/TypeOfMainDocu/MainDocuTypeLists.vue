<template>
  <div>

    <div v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

    <div class="table_container" v-else>
      <q-table :columns="columns" 
      flat 
      bordered 
      :rows="table_data" 
      row-key="id" 
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
        { name: 'name', align: 'left', label: 'Type of Document', field: 'name', sortable: false },
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
          order: "name:asc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("type_of_docu/getTypeOfMainDocu", payload);
        if ([200, 201].includes(status)) {
          console.log(data.rows);
          let parsed_rows = data.rows.map((item) => {
            let parsed = {
              ...item
            }
            for(let column in item) {
              if(column != 'id' && column != 'status' && column != 'name'){
                parsed[column] = item[column] ? "Yes" : "No";
              } else if (column == 'status') {
                parsed[column] = item[column] ? "Active" : "Inactive";
              }
            }
            return parsed;
          });
          console.log(parsed_rows);
          vm.table_data = parsed_rows;
          vm.current = data.cpage;
          vm.max = data.tpage;
          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }

      },
      
      viewDetails (evt, row) {
        this.$router.push({name: 'type-of-main-document-update', params: {
          id: row.id
        }});
      },
      closeModal() {

      }
    }
  }

</script>
