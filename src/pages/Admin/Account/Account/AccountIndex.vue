<template>
  <div>
    <app-user-accounts />
  </div>
</template>

<script>
  import UserAccounts from "components/Admin/Account/UserAccounts.vue";
export default {
    data: () => ({
    }),

    components: {
      AppUserAccounts: UserAccounts ,
    },
    methods: {
    }
}</script>
