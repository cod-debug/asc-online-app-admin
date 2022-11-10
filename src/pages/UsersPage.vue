<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-breadcrumbs align="right">
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el
        label="User Accounts"
        icon="person"
        to="/user/accounts"
      />
    </q-breadcrumbs>
    <!-- form -->

    <q-table
      ref="tableRef"
      title="User Accounts"
      :rows="userTable.rows"
      :columns="userTable.columns"
      table-header-class="bg-black text-white"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense
                 size="sm"
                 style="padding: 2px 5px;"
                 color="secondary"
                 icon="thumb_up"
                 label="Approve"
                 v-if="props.row.status == 'for_approval'"
                 @click="approveUser(props)"></q-btn>
          <q-btn dense
                 size="sm"
                 style="background: #FF0080; color: white; margin: 0 5px; padding: 2px 5px;"
                 icon="delete"
                 label="Delete"></q-btn>
          <q-btn dense
                 size="sm"
                 style="background: goldenrod; color: white; margin: 0 5px; padding: 2px 5px;"
                 icon="power_settings_new"
                 label="Shutdown Website"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userTable: {
        rows: [],
        columns: [
          {
            name: "id",
            align: "left",
            label: "#",
            field: "id",
            sortable: true,
          },
          {
            name: "fullname",
            align: "left",
            label: "Full Name",
            field: "fullname",
            sortable: true,
          },

          {
            name: "company",
            required: true,
            label: "Business Name",
            field: "company",
            sortable: true,
            align: "left",
          },
          {
            name: "email",
            required: true,
            label: "Email Address",
            field: "email",
            sortable: true,
            align: "left",
          },
          {
            name: "status",
            label: "Status",
            align: "left",
            field: "status",
            sortable: true,
          },
          { name: "actions", label: "Actions", field: "sodium" },
        ],
      },
    };
  },
  mounted() {
    this.getAllUserApplication();
  },
  methods: {

    ...mapActions("users", ["approveUser"]),
    getAllUserApplication() {
      axios({
        url:
          process.env.API_URL +
          "/usr/all",
        method: "get",
        headers: {
           authorization: `Bearer ${this.$store.getters["auth/getToken"]}`,
        },
      })
        .then((response) => {
          console.log(response.data.reslt, "asdasd");
          if (response.status == 200) {
            response.data.reslt.map((x, key) => {
              x.fullname = `${x.fname} ${x.lname}`;
              x.company = x.bsns_name;
              x.id = key+1;
            });

            this.userTable.rows = response.data.reslt;

            console.log(this.userTable.rows);
          }
        })
        .catch((err) => {
          console.log(err.response);
          // this.$q.notify({
          //   type: "negative",
          //   icon: "error",
          //   message: `Error : ${err.response.data}`,
          // });
        });
    },
    approveUser(data) {
      let payload = {
        id: data.row._id
      }

      axios({
        url:
          process.env.API_URL +
          `/apprv/${payload.id}`,
        method: "put",
        headers: {
          authorization: `Bearer ${this.$store.getters["auth/getToken"]}`,
        },
      }).then((response) => {
        console.log(response, "APPROVAL");
        this.$q.notify({
          type: "positive",
          icon: "success",
          message: `Successfully approved user`,
        });

      }).catch((data) => {
        this.$q.notify({
          type: "negative",
          icon: "error",
          message: `Something went wrong`,
        });

      });

      this.getAllUserApplication();
      return false;
      this.$q
        .dialog({
          title: "APPROVED USER",
          message:
            "Approve this user means your allowing his/her to used our CMS",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          axios({
            url: process.env.API_URL + `/api/invrel/userapprove`,
            method: "post",
            data: {
              compID: data.row.compID._id,
              email: data.row.email,
              approve: "yes",
            },
            headers: {
              authorization: `Bearer ${this.$store.getters["auth/getToken"]}`,
            },
          })
            .then((response) => {
              console.log(response);
              if (response.status == 200) {
                console.log(response.data.data);
                this.$q.notify({
                  type: "positive",
                  icon: "check_circle",
                  message: `Approved : User has now access to our CMS APP`,
                });
                this.getAllUserApplication();
              }
            })
            .catch((err) => {
              console.log(err.response);
              this.$q.notify({
                type: "negative",
                icon: "error",
                message: `Error : ${ err.response.data.message }`,
              });
            });
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
};
</script>
