<template>
  <div class="q-mt-md">
    <!--<q-btn label="Add ASC User" elevated class="q-my-md" size="sm" icon="add_circle" color="primary" @click="show_add_user_modal = true" />-->

    <q-table :rows="rows"
             :columns="columns"
             row-key="fname"
             :square="true" />
    <app-add-user-modal v-if="show_add_user_modal" :selected_item="{}" modal_type="add-user" :closeModal="closeModal" />
  </div>
</template>

<script>
import AddUserModal from "../Modals/AddUser.vue";
  const columns = [
    { name: 'fname', align: 'center', label: 'First name', field: 'fname', sortable: true, sort: "asc" },
    { name: 'lname', label: 'Last Name', field: 'lname', sortable: true },
    { name: 'company', label: 'Company', field: 'lname' },
    { name: 'email_address', label: 'Email Address', field: 'email_address' },
    { name: 'mobile', label: 'Mobile Number', field: 'mobile' },
    { name: 'action', label: 'Status', field: 'action', sortable: true },
  ]

export default {
    data: () => ({
    show_add_user_modal: false,
    rows: [
      {
        fname: 'Sample',
        lname: 'ASC USER',
        company: 'sample',
        email_address: 'sample@sample.com',
        mobile: '091234567890',
        action: 'status'
      },
    ],
  }),
    components: {
      AppAddUserModal: AddUserModal,
    },
    methods: {
      closeModal() {
        this.show_add_user_modal = false;
      }
    },
    setup () {
      return {
        columns,
      }
    }
}
</script>
