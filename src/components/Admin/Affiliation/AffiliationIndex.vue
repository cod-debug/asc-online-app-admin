<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Member's Affiliation" elevated class="q-mb-md q-mr-md" size="md" icon="add_circle" color="primary" @click="addAffil" id="addAscUser" />
        <div class="text-h6 page-title text-dark"><q-icon name="groups" /> Member's Affiliation</div>
      </q-card-section>

      <q-separator inset />


      <q-card-section v-if="loading_list" class="text-center q-pa-lg">
        <div class="loading-page">
          <q-spinner-ios color="white" size="3rem" />
        </div>
      </q-card-section>
      <q-card-section v-else>

        <q-table :rows="table_data"
                 :columns="columns"
                 row-key="id"
                 flat
                 :square="true"
                 hide-bottom
                 
                @row-click="update">


          <template v-slot:body-cell-is_member="props">
            <q-td :props="props" @click="update(props)">
              {{props.row.member == 1 ? 'Yes' : 'No'}}
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props" @click="update(props)">
              <q-badge color="green" v-if="props.row.status == 1">
                Active
              </q-badge>
              <q-badge color="red" v-else>
                Inactive
              </q-badge>
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
      </q-card-section>

      <app-add-affiliation-modal v-if="show_add_affiliation_modal" :selected_item="selected_item" :closeModal="closeModal" />
    </q-card>
  </div>
</template>

<script>
  import AddAffiliationModal from "./Modals/AddAffiliationModal.vue";
  export default {
    name: "member_affiliation_list",

    data: () => ({
      show_add_affiliation_modal: false,
      columns: [
        { name: 'member_affiliation', align: 'left', label: 'Member\'s affiliation', field: 'name', sortable: true },
        { name: 'is_member', align: 'left', label: 'Member', field: 'member', sortable: true, },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true, },
      ],
      selected_item: {},
      table_data: [],
      size: 5,
      current: 1,
      loading_list: true,
      is_update: false,

    }),

    components: {
      appAddAffiliationModal: AddAffiliationModal
    },

    mounted() {
      this.initApp();
    },

    watch: {
      current(newVal) {
        if (newVal) {
          this.getAllAffiliation();
        }
      }
    },
    methods: {
      initApp() {
        this.getAllAffiliation();
      },

      addAffil() {
        this.show_add_affiliation_modal = true;
        this.selected_item = false;
      },

      async getAllAffiliation() {
        let payload = {
          page: this.current,
          size: this.size,
          order: "id:asc",
          search: "",
        }
        this.loading_list = true;

        try {
          let { data, status } = await this.$store.dispatch('affiliation/getAllAffiliation', payload);
          
          if ([200, 201].includes(status)) {
            this.table_data = data.rows;
            this.current = data.cpage;
            this.max = data.tpage;
            
          }
        } catch (e) {

          console.log(e, "STATUS");

        }
        this.loading_list = false;
      },
      update(e, row) {
        this.selected_item = row;
        this.show_add_affiliation_modal = true;
      },
      closeModal() {
        this.show_add_affiliation_modal = false;
      }
    }
  }

</script>
