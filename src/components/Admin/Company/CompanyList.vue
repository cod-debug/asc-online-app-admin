<template>
  <div>
    
    <form @submit.prevent="initApp(true)" method="POST" >
      <q-input bottom-slots  v-model="search" outlined label="Search Company" hint="Hit ''Enter'' key or click search icon to search application.">
        <template v-slot:append>
          <!-- <q-icon v-if="search !== ''" name="close" @click="search = '' && getList(true)" class="cursor-pointer" /> -->
          <q-icon name="search" @click="initApp(true)" />
        </template>
      </q-input>
      <!-- <q-input outlined label="Search Applications" class="q-mt-md"  v-model="search" @blur="getList(true)" /> -->
    </form>
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
                      :max-pages="6"
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
        // { name: 'member_affiliation', align: 'left', label: 'Member Affiliation', field: 'member_affiliation', sortable: true, },
        // { name: 'telephone', align: 'left', label: 'Telephone Number', field: 'telephone', sortable: true, },
        // { name: 'tin', align: 'left', label: 'TIN', field: 'tin', sortable: true, },
        // { name: 'country', align: 'left', label: 'Country', field: 'country', sortable: true, },
        { name: 'address', align: 'left', label: 'Address', field: 'address', sortable: true, },
        { name: 'delinquent', align: 'left', label: 'Delinquent', field: 'delinquent', sortable: true, },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true, },
        { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true, },
      ],

      table_data: [],
      current: 1,
      max: 0,
      size: 5,
      loading_list: true,
      search: "",
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
     async initApp(is_search) {
        let vm = this;
        if(is_search){
          this.current = 1;
        }
        vm.loading_list = true;
        let payload = {
          page: this.current,
          size: vm.size,
          order: "name:asc",
          search: this.search,
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

      parseStatus(s) {
        switch (s) {
          case 1:
            return {val: 'inactive', color: 'grey'}
            break;
          case 0:
            return { val: 'active', color: 'green'}
            break;
        }
      },


      closeModal() {

      }
    }
  }

</script>
