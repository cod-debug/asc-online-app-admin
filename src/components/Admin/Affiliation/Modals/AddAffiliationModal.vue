<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="show_add_aff_modal" :persistent="true">
      <q-card style="width: 1080px; max-width: 90vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Member's Affiliation</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="closeModal" />
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <q-form ref="add_member_affiliation_form"
                  @submit.prevent="saveAffiliation"
                  :greedy="true">
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                <q-input outlined
                         label="Members's Affiliation *"
                         v-model="member_affiliation"
                        :rules="[val => !!val || 'Field is required']" />
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6 q-pa-sm">
                <q-select v-model="is_member"
                          use-input
                          outlined
                          input-debounce="0"
                          label="Member *"
                          :options="is_member_options"                      
                          :rules="[val => !!val || 'Field is required']">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="text-right">
          <q-btn color="primary" @click.prevent="saveAffiliation" class="q-my-sm"><q-icon name="save" /> Save</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import { Notify } from "quasar";
  export default {
    props: ['closeModal', 'selected_item'],
    data: () => ({
      show_add_aff_modal: true,
      is_member_options: [
        {
          value: true,
          label: "YES"
        },
        {
          value: false,
          label: "NO"
        }
      ],

      member_affiliation: "",
      is_member:
      {
        value: true,
        label: "YES"
      },
      is_update: false,
    }),

    mounted() {
      this.initApp();
    },
    methods: {
      async validate(evt) {
        return await this.$refs.add_member_affiliation_form.validate();
      },

      initApp() {
        if (this.selected_item) {
          this.is_update = true;
          this.member_affiliation = this.selected_item.name;
          this.is_member = this.selected_item.member == 1 ? { value: true, label: "YES" } : { value: false, label: "NO" };
        }
      },


      async saveAffiliation() {
        if (await this.validate()) {
          let payload = {
            "name": this.member_affiliation,
            "member": this.is_member.value,
            "status": 1
          }

          let endpoint = 'affiliation/addAffiliation';
          if (this.is_update) {
            payload.id = this.selected_item.id;
            endpoint = 'affiliation/updateAffiliation';
          }

          let { data, status } = await this.$store.dispatch(endpoint, payload);
          if ([200, 201].includes(status)) {
            Notify.create({
              message: `Successfully ${this.update ? 'updated' : 'added'} affiliation!`,
              position: 'center',
              closeBtn: "X",
              timeout: 3000,
              color: 'green',
            })
            this.$parent.$parent.initApp()
          } else {
            Notify.create({
              message: 'Something went wrong!',
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'red',
            })
          }

        } else {
          Notify.create({
            message: 'Validation error. Kindly check all fields!',
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'red',
          })
        }
      },
    }
  }
</script>
