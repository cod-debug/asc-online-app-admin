<template>
  <div>
    <div class="q-pa-md">
      <q-card bordered class="my-card" elevated :square="true">
        <q-card-section>
          <div><q-icon name="label_important" class="text-h6 text-red-15" /> Company Information</div>
          <q-form ref="announcement_form"
                  @submit.prevent="submit"
                  :greedy="true">
            <div class="row">
              <div class="col-sm-12 col-md-12 q-pa-sm">
                <q-input outlined
                         label="Title *"
                         v-model="title"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-12 q-pa-sm">
                <q-input v-model="details"
                         input-debounce="0"
                         outlined
                         label="Details *"
                         type="textarea"
                         :rules="[val => !!val || 'Field is required']">
                </q-input>
              </div>
              <div class="col-sm-12 col-md-12 q-pa-sm">
                <q-input v-model="link"
                         input-debounce="0"
                         outlined
                         label="Link *"
                         type="textarea"
                         :rules="[val => !!val || 'Field is required']">
                </q-input>
              </div>
            </div>
            <div class="row">
              <!-- <div class="col-sm-12 col-md-4 q-pa-sm">
                <q-input outlined
                         label="Number of View *"
                         v-model="number_of_view"
                         :rules="[val => !!val || 'Field is required']" />
              </div> -->
              <div class="col-sm-12 col-md-4 q-pa-sm">
                <q-input outlined
                         label="Posting Date *"
                         v-model="pdate"
                         type="date"
                         @focus="show_posting_date = true"
                         :rules="[val => !!val || 'Field is required']"
                         stack-label />
              </div>
              <div class="col-sm-12 col-md-4 q-pa-sm ">
                <q-select v-model="status"
                          input-debounce="0"
                          outlined
                          label="Status *"
                          :options="options"
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
      </q-card>

      <hr class="q-tabs-gutter" color="lightgray" />

      <div>
        <q-btn color="primary" class="q-mt-xl" @click="submit"><q-icon name="save" /> {{is_update ? 'Save Changes' : 'Save'}}</q-btn>
        <q-btn color="red-14" outline class="q-mt-xl q-ml-md" :to="{name:'announcement-lists'}"><q-icon name="cancel"/> Cancel</q-btn>
      </div>

    </div>
  </div>
</template>
<script>
  import { Notify } from "quasar";

  export default {
    data: () => ({
      title: "",
      details: "",
      link: "",
      number_of_view: "",
      show_posting_date: false,
      options: [],
      pdate: null,
      status: ""
    }),

    mounted() {
      this.options = ['ACTIVE', 'INACTIVE'];
      this.status = "ACTIVE";
      console.log(this.$route.params, "PARAMS");
    },

    computed: {
      is_update(){
        if(this.$route.params.id){
          console.log("SHOULD GET SPECIFIC");
          this.getSpecific();
          return true;
        } else {
          return false;
        }
      },

      selectedID(){
        return this.$route.params.id
      }
    },

    methods: {

      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async getSpecific(){
        let vm = this;

        let payload = {
          id: vm.selectedID
        }
        
        let { data, status } = await this.$store.dispatch("announcements/getSpecificAnnouncement", payload);
        console.log(data, "GET SPECIFIC");
        if([200, 201].includes(status)){
          for(let column in data){
            vm[column] = data[column];
          }
        }
      },

      async submit() {
        console.log(await this.validate());
        let vm = this;
        if (await this.validate()) {
          let payload = {
            "title": vm.title.toUpperCase(),
            "details": vm.details.toUpperCase(),
            "link": vm.link.toUpperCase(),
            "pdate": vm.pdate.toUpperCase()
          }
          

          let endpoint = "announcements/addAnnouncement";
          let success_message = "created";

          if(vm.is_update){
            payload = {
              data: payload,
              id: vm.selectedID
            }
            success_message = "updated";
            endpoint = "announcements/updateAnnouncement";
          }

          let { data, status } = await this.$store.dispatch(endpoint, payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: `Successfully ${success_message} announcement.`,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            this.$router.push({name: 'announcement-lists'})
          } else {

            Notify.create({
              message: data.message,
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
          })
        }
      },

      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },


    }

  }
</script>
