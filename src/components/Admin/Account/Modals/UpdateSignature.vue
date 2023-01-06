<template>
  <q-card-section>
    <q-card
      flat
      bordered
      class="fields-card"
      style="margin-bottom: 1rem"
    >
      <q-card-section>
        <div class="text-h6" style="display: flex">
          <i
            class="fa-solid fa-upload"
            style="color: #a00000"
          ></i>
          <!-- <q-icon name="label_important" style="color: #a00000"></q-icon> -->
          <span class="card-header">Upload e-Signature</span>
        </div>

        <!-- <q-separator style="margin-bottom: 1.5rem" /> -->

        <div class="text-h6" style="display: flex;">
          <!-- <i class="fa-solid fa-signature"></i> -->
          <span class="card-header">
            Filename:
          </span>
        </div>

        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <q-input
              ref="e-signature"
              name="e-signature"
              @update:model-value="handle_file_change"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-card-section>
</template>
<script>
export default {
  props: ['allow_action', 'user_details'],
  data: () => ({
    info: {
      e_signature_file: null,
      e_signature_file_path: null,
    }
  }),

  methods: {
    handle_file_change(file) {
      if (!file[0]) return;
      if (!file?.[0]?.type?.includes("image")) {
        if (this.$refs['e-signature'].$refs.input) {
          this.$refs['e-signature'].$refs.input.value = null
        }
        return this.$q.notify({
          type: 'negative',
          position: 'top-right',
          message: `Only images file accepted.`
        })
      }

      this.e_signature_file = file[0];

      console.log('fdfdf')

      this.$emit('update:allow_action', true);
    },

    on_submit_update(callback) {
      callback({
        e_signature_file: this.e_signature_file,
        e_signature_file_path: this.e_signature_file_path
      })
    },
  },

  mounted() {
    this.$emit('update:allow_action', false);
    this.e_signature_file = null;
    this.e_signature_file_path = null;
  }
}
</script>

<style lang="scss" scoped>
.fields-card {
  border: 1px solid #d8d8d8;
  border-radius: 0;
  box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 10%) !important;
  -webkit-box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 10%) !important;
  -moz-box-shadow: 5px 4px 5px 1px rgba(0, 0, 0, 0.1) !important;

  .card-header {
    font: 400 15px/24px Roboto, Helvetica Neue, sans-serif;
    letter-spacing: normal;
    margin: 0 0 16px;
    padding-left: 10px;
  }
  .card-sub-header {
    padding-left: 0;
    font-weight: 500;
    font: 400 15px/24px Roboto, Helvetica Neue, sans-serif;
    letter-spacing: normal;
    margin: 0 0 16px;
  }
}

</style>
