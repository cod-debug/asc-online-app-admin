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
          <q-item-section avatar>
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
    initApp() {
      this.drawerItems = [
        {
          icon: "fa-solid fa-user-circle",
          label: "S1 Applications",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Application List",
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
        {
          icon: "fa-solid fa-hand-holding-dollar",
          label: "For Payments",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Individual",
              count: 0,
              path: "/asc/page/application/single-application",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Multiple",
              count: 0,
              path: "/asc/page/application/multiple-applications",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "S2 Special Clearing",
              count: 0,
              path: "/asc/page/application/special-applications",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Accounts Payable",
              count: 0,
              path: "/asc/page/application/accounts-payable",
            }
          ]
        },
        {
          icon: "fa-solid fa-info-circle",
          label: "Announcement",
          path: "/asc/page/announcement",
        },
      ];
    }
  },
  mounted() {
    this.initApp();
  }
}
</script>

