<template>
  <q-card :square="true" elevated :bordered="true" class="q-my-md">
    <q-card-section>
      <div class="text-h6 q-mb-md"><q-icon name="label_important" class="text-red-15" /> Company Information:</div>
      <q-form @submit.prevent="onSubmit"
              ref="personal_info_form"
              :greedy="true">
        <div class="row">
          <div class="col-md-6 col-lg-6 q-pa-sm">

            <q-select v-model="compID"
                      use-input
                      outlined 
                      input-debounce="0"
                      label="Company"
                      :options="options"
                      :options-html="true"
                      :option-value="(option) => option === null ? null : option.value"
                      @filter="filterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

          </div>

          <div class="col-md-6 col-lg-6 q-pa-sm">
            <q-input outlined label="Member Affiliation" v-model="member_affiliation" :disable="true" />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <app-add-company-modal v-if="show_company_modal" :saveCompany="saveCompany" :closeAddCompanyModal="closeAddCompanyModal" />
  </q-card>
</template>

<script>
  import AddCompanyModal from "./Modal/AddCompany.vue";
  export default {
    data: () => ({
      compID: "",
      add_company_btn: "<button style='background-color: seagreen; color: white; border-radius: 3px; border: 1px solid seagreen;'>Add New Company</button>",
      show_more: "<span class='text-grey q-pa-sm'><i class='fa fa-undo'></i> <i> Load More</i></span>",
      load_previous: "<span class='text-grey q-pa-sm'><i class='fa fa-undo'></i> <i> Load Previous</i></span>",
      member_affiliation: "",
      options: [],
      stringOptions: [],

      // company modal
      show_company_modal: false,
      current: 1,
      size: 20,
      max_pages: 0,
      search: "",
      is_first_load: true,
    }),

    props: ['default_val'],

    components: {
      appAddCompanyModal: AddCompanyModal,
    },

    mounted() {
      this.initApp();
    },

    watch: {
      compID(newVal, oldVal) {

        if (newVal.value == this.add_company_btn) {
          this.addCompany();
          this.compID = "";
        } else if (newVal.value == this.show_more) {
          // if current page is less than the max number of pages current page will be added and call the get list of companies.
          if (this.max_pages > this.current) {
            this.current++;
            this.getAllCompanies();
          }
          this.compID = "";
        } else if (newVal.value == this.load_previous) {
          this.current--;
          this.getAllCompanies();
          this.compID = "";
        }

        if (this.compID != "") {
          this.member_affiliation = newVal.affiliation.name;
        }
      },

      search() {

      }
    },

    methods: {
      initApp() {
        for (let column in this.default_val) {
          this[column] = this.default_val[column];
        }

        this.getAllCompanies();
      },

      async onSubmit(evt) {
        return await this.$refs.personal_info_form.validate();
      },

      addCompany() {
        this.show_company_modal = true;
      },

      onReset() {

      },

      filterFn(val, update) {
        let vm = this;
        if (val === '') {
          update(() => {
            this.options = this.stringOptions
          })
          return
        }

        vm.search = val;
      },

      async getAllCompanies() {
        let payload = {
          page: this.current,
          size: this.size,
          order: "id:desc",
          search: this.search,
        }
        this.options.splice(this.options.length -1, 1);
        let { data, status } = await this.$store.dispatch('company/getListCompanies', payload);
        data.rows.map((item) => {
          this.options.push({ value: item.id, label: item.name, affiliation: item.affiliate });
        });


        if (this.is_first_load) {
          this.is_first_load = false;

          this.options.unshift({
            value: this.add_company_btn,
            label: this.add_company_btn,
            affiliation: '',
          });
        }

        this.options.push({
          value: this.show_more,
          label: this.show_more,
          affiliation: '',
        });

        this.stringOptions = this.options;
        this.max_pages = data.tpage;
      },

      saveCompany(newCompany) {
        this.options.push(newCompany);
        this.compID = newCompany;
        this.member_affiliation = newCompany.affiliation;
      },

      closeAddCompanyModal() {
        this.show_company_modal = false;
      },
    },
  }
</script>
