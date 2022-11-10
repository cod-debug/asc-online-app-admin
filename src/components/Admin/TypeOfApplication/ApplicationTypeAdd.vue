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
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input outlined
                         label="Description *"
                         v-model="description"
                         :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input v-model="sequence_num"
                         input-debounce="0"
                         outlined
                         label="Sequence Number *"
                         :rules="[val => !!val || 'Field is required']">
                </q-input>
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input v-model="clearing_release_time"
                         input-debounce="0"
                         outlined
                         label="Clearing Release Time"
                         type="time"
                         :rules="[val => !!val || 'Field is required']">
                </q-input>
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input v-model="decision_release_time"
                         input-debounce="0"
                         outlined
                         label="Clearing Release Time"
                         type="time"
                         :rules="[val => !!val || 'Field is required']">
                </q-input>
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input v-model="submission_start_time"
                         input-debounce="0"
                         outlined
                         label="Submission Start Time"
                         type="time"
                         :rules="[val => !!val || 'Field is required']">
                </q-input>
              </div>
              <div class="col-sm-12 col-md-6 q-pa-sm">
                <q-input v-model="submission_end_time"
                         input-debounce="0"
                         outlined
                         label="Submission End Time"
                         type="time"
                         :rules="[val => !!val || 'Field is required']">
                </q-input>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <hr class="q-tabs-gutter" color="lightgray" />

      <div>
        <q-btn color="primary" class="q-mt-xl" @click="submit"><q-icon name="save" /> Save</q-btn>
      </div>

    </div>
  </div>
</template>
<script>
  import { Notify } from "quasar";

  export default {
    data: () => ({
      description: "",
      sequence_num: "",
      clearing_release_time: "00:00:00",
      decision_release_time: "00:00:00",
      submission_start_time: "00:00:00",
      submission_end_time: "00:00:00",

    }),

    mounted() {
      this.options = ['ACTIVE', 'INACTIVE'];
      this.status = "ACTIVE";
    },

    methods: {

      async validate(evt) {
        return await this.$refs.announcement_form.validate();
      },

      async submit() {
        let vm = this;
        console.log(await this.validate());
        if (await this.validate()) {
          let payload = {
                "desc": vm.description,
                "seqnum": vm.sequence_num,
                "cleartime": vm.clearing_release_time,
                "decitime": vm.decision_release_time,
                "starttime": vm.submission_start_time,
                "endtime": vm.submission_end_time
            }

          let { data, status } = await this.$store.dispatch("type_of_application/addTypeOfApplication", payload);

          if ([200, 201].includes(status)) {

            Notify.create({
              message: 'Successfully created Application Type.',
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            })
            this.$router.push({name: 'type-of-application-lists'})
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
