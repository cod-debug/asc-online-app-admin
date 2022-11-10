<template>
  <div class="q-mt-md">


    <q-card-section v-if="loading_list" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </q-card-section>
  
    <q-table :rows="rows"
             v-else
             :columns="columns"
             row-key="id"
             :square="true"
             flat
             hide-bottom>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="parseStatus(props.row.status).color">{{parseStatus(props.row.status).val}}</q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round color="green-12" @click="view(props.row)"><i class="fa fa-eye"></i></q-btn>
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

    <modal-add-user :selected_item="selected_item" modal_type="approval" v-if="show_modal_user" :closeModal="closeModal" />
  </div>
</template>

<script>
  const columns = [
    { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
	{ name: 'fname', align: 'center', label: 'Full name', field: 'fullname', sortable: true },
    // { name: 'lname', align: 'center', label: 'Last Name', field: 'lname', sortable: true },
    // { name: 'company', align: 'center', label: 'Company', field: 'company' },
    { name: 'email_address', align: 'center', label: 'Email Address', field: 'email' },
    { name: 'mobile_num', align: 'center', label: 'Mobile Number', field: 'phone' },
    { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
    { name: 'actions', align: 'center', label: 'Actions', field: '', sortable: false },
]

  import AddUserModal from "../Modals/AddUser.vue";
export default {
  props: ["tableData"],
data: () => ({
  rows: [],
  is_approval_modal: false,
  selected_item: null,
  show_modal_user: false,
  current: 1,
  size: 5,
  max: 0,
  loading_list: false,
}),
  mounted(){
    this.initApp();
    },
    components: {
      modalAddUser: AddUserModal,
    },
    methods: {
      initApp() {
        this.getAllNONASC();
      },
      async getAllNONASC() {
        this.loading = true;
        let vm = this;

        vm.loading_list = true;
        let payload = {
          page: vm.current,
          size: vm.size,
          order: "id:asc",
          search: "",
        };
        let { data, status } = await this.$store.dispatch("account/getAllUsers", payload);

        if ([200, 201].includes(status)) {
          this.$nextTick(() => {
            this.rows = data.rows;
            vm.table_data = data.rows;
            vm.current = data.cpage;
            vm.max = data.tpage;
            this.loading = false;
          })
        }

        vm.loading_list = false;
      },
      view(item) {
        let vm = this;

        console.log(item);
        vm.selected_item = item;
        vm.show_modal_user = true;
      },
      closeModal() {
        this.show_modal_user = false;
      },
      parseStatus(s) {
        switch (s) {
          case 0:
            return {val: 'pending', color: 'grey'}
            break;
          case 1:
            return { val: 'active', color: 'green'}
            break;
        }
      },
    },
	setup () {
		return {
			columns,
		}
	}
}
</script>
