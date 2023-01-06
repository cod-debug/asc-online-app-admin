<template>
  <div>
    <div v-for="(item,key) in drawerItems" :key="key">
      <q-expansion-item
        class="nav-item"
        dense-toggle
        expand-separator
        :icon="item.icon"
        :label="item.label"
        v-if="item.children && item.children.length > 0"
      >
        <q-item clickable v-ripple class="nav-item-child"
          v-for="(i,k) in item.children" :key="k"
          :to="i.path"
          exact
        >
          <q-item-section avatar class="drawer-item-icon">
            <i :class="i.icon"></i>
          </q-item-section>

          <q-item-section class="text-red-15">
            {{ i.label || "N/A" }}
          </q-item-section>
          <q-item-section avatar v-if="typeof i.count === 'number'">
            <q-badge class="drawer-badge" rounded  color="green" text-color="black" :label="i.count" />
          </q-item-section>

        </q-item>
      </q-expansion-item>

      <q-item clickable v-ripple class="nav-item"
        v-else
        :to="item.path"
        exact
      >
        <q-item-section avatar>
          <i :class="item.icon"></i>
        </q-item-section>

        <q-item-section class="text-red-15">
          {{ item.label || "N/A" }}
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawerItems: [],
  }),
  methods: {
    async initApp() {
      this.drawerItems = [
        {
          icon: "fa-solid fa-user-circle",
          label: "S1 Applications",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Individual Applications",
              count: 0,
              path: "/asc/page/application/s1/lists",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Multiple Applications",
              count: 0,
              path: "/asc/page/application/s1/multiple",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Special Applications",
              count: 0,
              path: "/asc/page/application/s1/special",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "For Release",
              count: 0,
              path: "/asc/page/application/s1/for-release",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Released",
              count: 0,
              path: "/asc/page/application/s1/released",
            }
          ]
        },
        {
          icon: "fa-solid fa-user-circle",
          label: "S2 Applications",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Application List",
              count: 0,
              path: "/asc/page/application/s2/lists",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Special Clearing Request",
              count: 0,
              path: "/asc/page/application/s2/special",
            }
          ]
        },
        // {
        //   icon: "fa-solid fa-print",
        //   label: "Reports",
        //   path: "/asc/page/accounting/reports",
        // },
        {
          icon: "fa-solid fa-user-circle",
          label: "Account",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "User Accounts",
              count: null,
              path: "/asc/page/maintenance/accounts",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "User Role",
              count: null,
              path: "/asc/page/account/user-role",
            }
          ]
        },
        {
          icon: "fa-solid fa-screwdriver-wrench",
          label: "Maintenance",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Announcement",
              count: null,
              path: "/asc/page/maintenance/announcement-content/lists",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Company",
              count: null,
              path: "/asc/page/company/lists",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Membership Affiliation",
              count: null,
              path: "/asc/page/maintenance/affiliation",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Login Image",
              count: null,
              path: "/asc/page/maintenance/login-image",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Application",
              count: null,
              path: "/asc/page/maintenance/type-of-application",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Dialect",
              count: null,
              path: "/asc/page/maintenance/dialects",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Document",
              count: null,
              path: "/asc/page/maintenance/type-of-document",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Main Document",
              count: null,
              path: "/asc/page/maintenance/type-of-main-documents",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Main Document File Size",
              count: null,
              path: "/asc/page/maintenance/document-size/update/1",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Email Notification",
              count: null,
              path: "/asc/page/maintenance/email-notification",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Payment Type",
              count: null,
              path: "/asc/page/maintenance/payment-type",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Weekly User Schedule",
              count: null,
              path: "/asc/page/maintenance/weekly-user-schedule",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Reason",
              count: null,
              path: "/asc/page/maintenance/type-of-reason",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Number of Multiple Application Allowed",
              count: null,
              path: "/asc/page/maintenance/number-of-multiple-application-allowed/update/1",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Rationale",
              count: null,
              path: "/asc/page/maintenance/type-of-rational",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Screener Reviewer Pairing",
              count: null,
              path: "/asc/page/maintenance/screener-reviewer-pairs",
            },
            // {
            //   icon: "fa-solid fa-caret-right",
            //   label: "QR and Barcode Checker",
            //   count: null,
            //   path: "/asc/page/maintenance/qr-and-bar-code-checker",
            // },
            {
              icon: "fa-solid fa-caret-right",
              label: "Application Reassignment",
              count: null,
              path: "/asc/page/application/reassignment",
            },

          ]
        },
        {
          icon: "fa-solid fa-screwdriver-wrench",
          label: "Category-Brand Product",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Category",
              count: null,
              path: "/asc/page/maintenance/category",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Brands",
              count: null,
              path: "/asc/page/maintenance/brands",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Product",
              count: null,
              path: "/asc/page/maintenance/product",
            },
          ]
        },
        {
          icon: "fa-solid fa-screwdriver-wrench",
          label: "Medium & Execution",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Clearance",
              count: null,
              path: "/asc/page/maintenance/type-of-clearance",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Medium",
              count: null,
              path: "/asc/page/maintenance/type-of-medium",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Execution",
              count: null,
              path: "/asc/page/maintenance/type-of-executions",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Type of Medium Execution",
              count: null,
              path: "/asc/page/maintenance/medium-executions-controller",
            },
          ]
        },
        {
          icon: "fa-solid fa-clock",
          label: "Hours / Days  Maintenance",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Holiday",
              count: null,
              path: "/asc/page/maintenance/holidays",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "S1 and S2 Form Expiration Period",
              count: null,
              path: "/asc/page/maintenance/s1-s2-expiration-periods/update/1",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "S1 Form Schedule of Fees Settlement Period",
              count: null,
              path: "/asc/page/maintenance/s1-fees-settlement-period/update/1",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Incomplete Decision Expiration Period",
              count: null,
              path: "/asc/page/maintenance/s1-incomplete-decision-expiration-period/update/1",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Promissory Note Period",
              count: null,
              path: "/asc/page/maintenance/promissory-note-periods/update/1",
            },
          ]
        },
        {
          icon: "fa-solid fa-ban",
          label: "Penalties",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Brand Penalties",
              count: null,
              path: "/asc/page/maintenance/brand-penalties",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Company Penalties",
              count: null,
              path: "/asc/page/maintenance/company-penalties",
            },
          ]
        },
        // {
        //   icon: "fa-solid fa-star",
        //   label: "Rates",
        //   children: [
        //     {
        //       icon: "fa-solid fa-caret-right",
        //       label: "Maintenance of Fees (ASC Rates)",
        //       count: null,
        //       path: "/asc/page/maintenance/asc-rates",
        //     },
        //     {
        //       icon: "fa-solid fa-caret-right",
        //       label: "ASC Rates - Special",
        //       count: null,
        //       path: "/asc/page/maintenance/asc-rates-special",
        //     },
        //   ]
        // },
        {
          icon: "fa-solid fa-info-circle",
          label: "Announcement",
          path: "/asc/page/announcement",
        },
      ];

      // setInterval(async () => {
      // }, 1000);
      
      let {data, status} = await this.$store.dispatch("asc_user/getCountByRole");
      if([200, 201].includes(status)){
        vm.drawerItems[0].children[0].count = data.individualCount;
        vm.drawerItems[0].children[1].count = data.multipleCount;
        vm.drawerItems[0].children[2].count = data.specialCount;
        vm.drawerItems[0].children[3].count = data.forReleaseCount;
        vm.drawerItems[0].children[2].count = data.releasedCount;
        vm.drawerItems[1].children[0].count = data.s2InvididualCount;
        vm.drawerItems[1].children[1].count = data.s2MultipleCount;
        vm.drawerItems[1].children[1].count = data.s2SpecialCount;
      }
    }
  },
  mounted() {
    this.initApp();
    

  }
}
</script>

