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
      row-key="screener_name" 
      hide-bottom >
      
        <template #body="props">
          <q-tr
            :props="props"
            hover
            @click="viewDetails(props.row)"
            style="cursor: pointer"
          >
            <q-td
              key="screener_name"
              :props="props"
            >
              {{ props.row.screenuser.fname   || '--' }}
              {{ props.row.screenuser.lname   || '--' }}
            </q-td>
            <q-td
              key="revs"
              :props="props"
            >
              {{ props.row.reviewer[0].fname   || '--' }}
              {{ props.row.reviewer[0].lname   || '--' }}
            </q-td>
          </q-tr>
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
import axios from "axios";

  export default {
    name: "member_affiliation_list",

    data: () => ({
      columns: [
        { name: 'screener_name', align: 'left', label: 'Screener Name', field: 'screenuser', sortable: false },
        { name: 'revs', align: 'left', label: 'Reviewer Name', field: 'revs', sortable: false },
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

        let token = localStorage.getItem('token') || '';
        const headers = {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
        }
        
        let { data, status } = await axios({
          method: "get",
          url: `${process.env.API_BASE_URL}/screener-reviewer-pair/getall/`,
          params: payload,
          headers: headers,
        });

        if ([200, 201].includes(status)) {
          let parsed = data.rows.map((item) => {
            return {...item, revs: item.reviewer.join(", ")}
          })
          vm.table_data = parsed;
          vm.current = data.cpage;
          vm.max = data.tpage;

          vm.loading_list = false;
        } else {
          vm.loading_list = false;
        }

        return false;


      },
      
      viewDetails (row) {
        this.$router.push({name: 'srp-update', params: {
          id: row.id
        }});
      },
      closeModal() {

      }
    }
  }

</script>
