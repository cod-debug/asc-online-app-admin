<template>
  <q-dialog
    v-model="open_dialog"
    full-width
    persistent
  >
    <q-card
      flat
      bordered
      class="fields-card"
      style="margin-bottom: 1rem"
    >
      <q-card-section>
        <div class="text-h6">
          <i class="fa-solid fa-id-card-clip"></i>
          User Account
        </div>
      </q-card-section>

      <q-card-section>
        <q-tabs
          v-model="tab"
          inline-label
          indicator-color="purple"
          class="text-teal"
          align="left"
        >
          <q-tab
            :name="item.name"
            :label="item.label"
            class="tab-item-custom"
            v-for="(item, key) in tab_list"
            :key="key"
          />
        </q-tabs>

        <q-separator style="margin-top: 0.01rem;" />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="user-details">
            <UserDetails
              ref="user-details"
              v-model:allow_action="allow_action"
              :user_details="user_details"
            />
          </q-tab-panel>
          <q-tab-panel name="e-signature">
            <Signature
              ref="signature"
              v-model:allow_action="allow_action"
              :user_details="user_details"
            />
          </q-tab-panel>
          <q-tab-panel name="account-information">
            <AccountInformation
              ref="account-information"
              v-model:allow_action="allow_action"
              :user_details="user_details"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn icon="close" color="red" label="Close" v-close-popup />

        <q-btn
          :icon="action_icon"
          :color="action_color"
          :label="action_label"
          @click="handle_update"
          :disable="!allow_action"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UserDetails from './TabContent/UserDetailsTab';
import Signature from './TabContent/SignatureTab';
import AccountInformation from './TabContent/InformationTab';
import { Notify } from 'quasar';
export default {
  components: {
    UserDetails,
    Signature,
    AccountInformation
  },
  props: ['user_details'],
  data: () => ({
    open_dialog: false,
    tab_list: [],
    tab: null,

    action_label: "",
    action_icon: "",
    action_color: "",
    allow_action: false,
  }),

  watch: {
    tab(new_value) {
      if (new_value === 'user-details') {
        this.action_label = "Update";
        this.action_icon = "offline_pin";
        this.action_color = "primary";
      }
      else if (new_value === 'e-signature') {
        this.action_label = "Upload";
        this.action_icon = "upload";
        this.action_color = "red-14";
      }
      else if (new_value === 'account-information') {
        this.action_label = "Update";
        this.action_icon = "offline_pin";
        this.action_color = "primary";
      }
    }
  },

  methods: {
    show_dialog() {
      this.open_dialog = true;

      this.tab_list = [
        {
          name: "user-details",
          label: "User Details"
        },
        {
          name: "e-signature",
          label: "E-Signature"
        },
        {
          name: "account-information",
          label: "Account Information"
        }
      ];

      this.tab = "user-details";
    },

    handle_update() {
      console.log('handle_update')
      let vm = this;

      let ref = "";
      if (this.tab === 'user-details') {
        ref = "user-details";
      }
      else if (this.tab === 'e-signature') {
        ref = "signature";
      }
      else if (this.tab === 'account-information') {
        ref = "account-information";
      }

      this.$refs[ref].on_submit_update((payload) => {
        let confirm_message = "";
        let endpoint = "acount/updateProfile";
        if (this.tab === 'user-details') {
          confirm_message = "Are you sure to update your details?";

          payload = {
            data: payload,
            params: {
              id: localStorage.getItem("ui")
            }
          }
          endpoint = "account/updateProfile";
        }
        else if (this.tab === 'e-signature') {
          confirm_message = "Are you sure to upload your e-signature?";
          let formData = new FormData();

          formData.append('file', payload.e_signature_file);
          formData.append('id', localStorage.getItem("ui"));
          payload = formData;
          endpoint = "account/updateESign";
        }
        else if (this.tab === 'account-information') {
          confirm_message = "Are you sure to update account?"

          payload = {
            new_passwd: payload.password,
            old_passwd: payload.old_password
          }
          endpoint = "account/updatePassword";
        }

        console.log(payload, "PAYLOAD");

        this.$q.dialog({
          title: 'Confirmation',
          message: confirm_message,
          cancel: true,
          persistent: true,
          ok: {
            label: "Update",
            flat: true,
            push: true,
            color: "primary"
          },
        }).onOk(async () => {
          let {data, status} = await vm.$store.dispatch(endpoint, payload);          
          console.log(data);
          if([200, 201].includes(status)){
            Notify.create({
              message: data.message,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'green',
            });
          } else {
            Notify.create({
              message: data.message,
              position: 'top-right',
              closeBtn: "X",
              timeout: 2000,
              color: 'red',
            });
          }
        })
      })

    }
  }
}
</script>
