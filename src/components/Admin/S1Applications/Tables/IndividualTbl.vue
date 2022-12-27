<template>
  <div class="q-mt-md">
    <div class="table_container">
      

      <div class="table_container">
          <div v-if="table_data.length <= 0" class="no-data-found">
            <q-icon name="warning" /> NO DATA FOUND...
          </div>
        <q-table v-else :columns="columns" flat bordered :rows="table_data" row-key="id" hide-bottom @row-click="viewDetails" >
          <template v-slot:body="props">
            <q-tr :props="props" :class="(isOwned) ? 'bg-accent text-white':'bg-white text-black'">
              <q-td :props="props" >
                {{ props.row.isLocked }}
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <div class="text-right q-mt-md">
          <q-pagination v-model="current"
                        :max="max_page"
                        direction-links
                        flat
                        color="grey"
                        active-color="primary" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['tab_type'],
    data: () => ({
      columns: [
        { name: 'reference', align: 'left', label: 'REFERENCE CODE', field: 'referrence_code', sortable: true },
        { name: 'type', align: 'left', label: 'TYPE OF APPLICATION', field: 'type', sortable: true, },
        { name: 'company_name', align: 'left', label: 'COMPANY NAME', field: 'company_name', sortable: true, },
        { name: 'brand', align: 'left', label: 'BRAND', field: 'brand', sortable: true, },
        { name: 'type_of_medium', align: 'left', label: 'TYPE OF MEDIUM', field: 'type_of_medium', sortable: true, },
        { name: 'status', align: 'left', label: 'APP STATUS', field: 'status', sortable: true, },
        { name: 'payment_status', align: 'left', label: 'PAYMENT STATUS', field: 'payment_status', sortable: true, },
        { name: 'internal_status', align: 'left', label: 'INTERNAL STATUS', field: 'internal_status', sortable: true, },
      ],
      take: 10,
      max_page: 0,
      current: 1,
      table_data: [],
    }),

    mounted(){
      this.getList();
    },
    watch:{
      tab_type(newVal){
        this.getList();
      },
      current(newVal){
        if(newVal){
          this.getList()
        }
      }
    },
    methods: {
      update(e, row) {
        this.selected_item = row;
        console.log(this.$router);
        this.$router.push({ name: "individual-application-update", params: { id: row.id } });
      },
      
      isOwned(assigned_user){
        return assigned_user == localStorage.getItem('ui');
      },

      async getList(){
        let vm = this;
        let payload = {
          data: {
            "form_group": "INDIVIDUAL",
            "search": "",
            "processType": vm.tab_type
          },
          params: {
            take: vm.take,
            page: vm.current
          }
        }

        let {data, status} = await vm.$store.dispatch("s1/getS1Applications", payload);
        if([200, 201].includes(status)){
          vm.table_data = data.data;
          vm.max_page = data.lastPage;
        }

        console.log(vm.table_data);
      },
    }
  }
</script>
