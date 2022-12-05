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
      table-class="screenwide"
      :rows="table_data" 
      row-key="id" 
      hide-bottom 
      @row-click="viewDetails" >
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
    name: "member_affiliation_list",

    data: () => ({
      columns: [
        { name: 'rationale', align: 'left', label: 'Rationale', field: 'rationale', sortable: false, style: "width: 100px"},
        { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: false },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: false },
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
          order: "rationale:asc",
          search: "",
        }
        vm.loading_list = true;
        let { data, status } = await vm.$store.dispatch("rationale/get", payload);
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
        this.$router.push({name: 'rational-update', params: {
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
