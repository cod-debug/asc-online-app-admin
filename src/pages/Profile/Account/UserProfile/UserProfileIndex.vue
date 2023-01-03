<template>
  <div class="container-fluid">
    <div class="row q-mt-lg">
      <div class="col-sm-12">
        <div class="top-content">
          <div class="row" style="align-items: center;">
            <div class="col-md-5 image-side text-center">
              <img
                src="~assets/images/Profile-PNG-Free-Image.png"
                alt="user-profile-img"
              />
            </div>
            <div class="col-md-7 user-details">
              <h2>
                <!-- 1 DIGITAL MEDIA GROUP, INC. -->
                {{ user_details?.company?.name || "NO REGISTERED COMPANY" }}
              </h2>
              <hr />
              <p>
                <span class="material-icons">account_box</span>
                {{ get_full_name || "N/A" }}
              </p>
              <p>
                <span class="material-icons">email</span>
                {{ user_details?.email || "N/A" }}
              </p>
              <p>
                <span class="material-icons">perm_identity</span>
                {{ user_details?.usertype?.name?.toUpperCase() || "N/A" }}
              </p>
              <p>
                <span class="material-icons">phone_in_talk</span>
                {{ user_details?.phone || "NO CONTACT" }}
              </p>
              <p>
                <span class="material-icons">business</span>
                {{ user_details?.company?.address || "NO ADDRESS" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row top-content-footer">
      <div class="col-md-6">CONTACT ME</div>
      <div class="col-md-6 update-button">
        <q-btn
          icon="manage_accounts"
          label="Update Account"
          color="red"
          @click="handle_update_profile"
        />
      </div>
    </div>
    <div class="row sub-content">
      <div class="col-md-2">
        <q-avatar>
          <img src="~assets/images/social-media/gmail.png">
        </q-avatar>
      </div>
      <div class="col-md-10">
        <p class="social-media-name email">EMAIL</p>
        <p class="details">
          {{ user_details?.email || "N/A" }}
        </p>
      </div>
    </div>

    <UpdateProfileDialog
      ref="profile-dialog"
      :user_details="user_details"
    />


    <div v-if="is_loading" class="text-center q-pa-lg">
      <div class="loading-page">
        <q-spinner-ios color="white" size="3rem" />
      </div>
    </div>

  </div>
</template>

<script>
import UpdateProfileDialog from "src/components/Admin/Account/Profile/ProfileIndex.vue";
export default {
  components: {
    UpdateProfileDialog
  },
  data: () => ({
    user_details: {},
    is_loading: false,
  }),

  watch: {
    // '$store.state.sessions.user_logged_details'(new_value) {
    //   console.log('new_value', new_value)
    //   if (new_value?.id) {
    //     this.get_user_details();
    //   }
    // }
  },

  computed: {
    get_full_name() {
      let fullname = [];
      if (this.user_details?.fname) {
        fullname.push(this.user_details.fname)
      }
      if (this.user_details?.mname) {
        fullname.push(this.user_details.mname)
      }
      if (this.user_details?.lname) {
        fullname.push(this.user_details.lname)
      }
      return fullname.join(' ').toUpperCase();
    }
  },

  methods: {
    init_app() {
      this.get_user_details();
    },

    async get_user_details() {
      let user_id = localStorage.getItem('ui') || null;
      if (!user_id) {
        return;
      }
      // this.$spinner.show('Loading...')
      this.is_loading = true;
      try {
        // const {data, status} = await this.$store.dispatch('common/_user_logged');
        const {data, status} = await this.$store.dispatch('account/getOneUser', {id: user_id})
        console.log('data', data)
        console.log('status', status)
        if ([200,201].includes(status)) {
          this.user_details = data || null;
        }
      } catch (error) {
        console.log('error', error)
      }

      this.$nextTick(() => {
        // this.$spinner.hide();
        this.is_loading = false;
      })
    },

    handle_update_profile() {
      // this.$q.notify({
      //   message: 'Sorry! Not available at this time',
      //   icon: 'report_problem',
      //   timeout: 2000,
      //   position: "top",
      //   color: "negative",
      // })

      // console.log('dfasdfsd', this.$refs['profile-dialog'])

      this.$refs['profile-dialog'].show_dialog();
    }
  },

  mounted() {
    this.init_app();
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  margin: auto;
  width: 80%;
  padding: 30px;
  position: relative;
  border-radius: 5px;
  padding: 25px;
  border-radius: 9px;
  background: #fff;
  box-shadow: 7px 7px 14px hsl(0deg 0% 62% / 59%), -7px -7px 14px #dfdfdf;
}

.image-side img {
  height: 11em;
  width: 12em;
  opacity: 0.2;
}
.user-details {
  padding: 20px 5px;
  h2 {
    font-weight: 600;
    text-decoration: none;
    font-size: 25px;
    line-height: 0;
  }
  p {
    margin: 0;
    font-size: 12px;
  }

  .material-icons {
    font-size: 15px;
    padding-right: 10px;
  }
}

.top-content {
  background-color: #9c0a00;
  padding: 20px;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.top-content-footer {
  background-color: #830900;
  color: hsla(0,0%,100%,.774);
  padding: 10px 0 10px 25px;
  border-radius: 0 0 10px 10px;
  font-weight: 500;
  box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 16%);
    -webkit-box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 16%);
    -moz-box-shadow: 5px 4px 5px 1px rgba(0,0,0,.16);

  .update-button {
    text-align: end;
    padding-right: 1rem;
  }
}
.sub-content {
  padding: 20px;
  border: 1px solid hsla(0,0%,50.2%,.356);
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 16%);
    -webkit-box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 16%);
    -moz-box-shadow: 5px 4px 5px 1px rgba(0,0,0,.16);
  p.social-media-name {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: red;
  }
  p.details {
    color: #c2c2c2;
    margin: 0;
  }
}
</style>
